var assertions = {
    assertTrue: function (condition, message) {
        var errorMessage = message || "Expected to be true, but got false";

        if (!condition) {
            throw new Error(errorMessage);
        }
    },

    assertFalse: function (condition, message) {
        var errorMessage = message || "Expected to be false, but got true";

        this.assertTrue(!condition, errorMessage);
    },

    assertEqual: function (expected, actual) {
        this.assertTrue(
            expected === actual,
            "Expected to equal " + expected + ", but got: " + actual
        );
    },

    assertNotEqual: function (expected, actual) {
        this.assertFalse(
            expected === actual,
            "Expected not to equal " + expected + ", but got: " + actual
        )
    },

    assertThrow: function (expectedMessage, action) {
        var hasThrown = false;

        try {
            action();
        } catch (error) {
            hasThrown = true;
            this.assertEqual(expectedMessage, error.message);
        }

        this.assertTrue(
            hasThrown,
            "Expected to throw an error, but nothing was thrown"
        );
    },

    assertNotThrow: function (action) {
        try {
            action();
        } catch (error) {
            throw new Error(
                "Expected not to throw error, but thrown '"
                + error.message
                + "'"
            );
        }
    },

    spy: function () {
        function that() {
            that.called = true;
        }

        that.assertNotCalled = function () {
            assertions.assertFalse(that.called, "Expected not to be called");
        };

        that.assertCalled = function () {
            assertions.assertTrue(that.called, "Expected to be called");
        };

        return that;
    }
};

function SimpleReporter() {
    this.reportTestSuite = function (name) {
        process.stdout.write("\n" + name + "\n");
    };

    this.reportTest = function (name) {
        process.stdout.write("\t" + name + "\n");
    };
}

function TestSuiteRunStatus() {
    var failed = false;

    this.markAsFailed = function () {
        failed = true;
    };

    this.hasFailed = function () {
        return failed;
    };
}

function SimpleProcess(globalProcess) {
    var hook = null;

    this.exit = function (code) {
        if (hook !== null)
            hook();

        globalProcess.exit(code);
    };

    this.installHook = function (aHook) {
        hook = aHook;
    };

    this.uninstallHook = function () {
        hook = null;
    };
}

var simpleProcess = new SimpleProcess(global.process);

function TestSuiteRunContext(testSuiteConstructor, options) {
    options = options || {};
    var reporter = options.reporter || new SimpleReporter();
    var process = options.process || simpleProcess;
    var silenceFailures = options.silenceFailures || false;
    var status = new TestSuiteRunStatus();
    var verifyAllTestsRun = options.verifyAllTestsRun || false;
    var testCount = 0;
    var testRun = 0;

    this.invoke = function () {
        if (verifyAllTestsRun)
            installVerifyAllTestsRunHook();

        reportTestSuite();
        countAllTests();
        runAllTests();
        finishTestRun();
    };

    function installVerifyAllTestsRunHook() {
        simpleProcess.installHook(function () {
            if (testRun < testCount) {
                simpleProcess.uninstallHook();
                var error = new Error("Expected all tests to run");
                error.bubbleUp = true;
                throw error;
            }
        });
    }

    function reportTestSuite() {
        reporter.reportTestSuite(getTestSuiteName());
    }

    function getTestSuiteName() {
        if (typeof(createTestSuite().getTestSuiteName) !== "function") {
            return testSuiteConstructor.name;
        }

        return createTestSuite().getTestSuiteName();
    }

    function createTestSuite() {
        return new testSuiteConstructor(assertions);
    }

    function countAllTests() {
        for (var testName in createTestSuite())
            if (testName.match(/^test/))
                testCount++;
    }

    function runAllTests() {
        for (var testName in createTestSuite())
            if (testName.match(/^test/))
                handleTest(testName);
    }

    function handleTest(testName) {
        testRun++;
        reportTest(testName);
        runTest(createTestSuite(), testName);
    }

    function reportTest(testName) {
        reporter.reportTest(testName);
    }

    function runTest(testSuite, testName) {
        try {
            testSuite[testName]();
        } catch (error) {
            if (error.bubbleUp) throw error;
            if (!silenceFailures) console.log(error);
            status.markAsFailed();
        }
    }

    function finishTestRun() {
        if (status.hasFailed()) return process.exit(1);
        process.exit(0);
    }
}

function runTestSuite(testSuiteConstructor, options) {
    new TestSuiteRunContext(testSuiteConstructor, options).invoke();
}

module.exports = runTestSuite;
module.exports.SimpleReporter = SimpleReporter;
module.exports.SimpleProcess = SimpleProcess;