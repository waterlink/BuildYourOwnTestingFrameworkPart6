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
    }
}

function getTestSuiteName(testSuiteConstructor, testSuitePrototype) {
    if (typeof(testSuitePrototype.getTestSuiteName) !== "function") {
        return testSuiteConstructor.name;
    }

    return testSuitePrototype.getTestSuiteName();
}

function createTestSuite(testSuiteConstructor) {
    return new testSuiteConstructor(assertions);
}

function runTestSuite(testSuiteConstructor, options) {
    options = options || {};
    var reporter = options.reporter || new SimpleReporter();

    var testSuitePrototype = createTestSuite(testSuiteConstructor);

    reporter.reportTestSuite(getTestSuiteName(testSuiteConstructor, testSuitePrototype));

    for (var testName in testSuitePrototype) {
        if (testName.match(/^test/)) {
            reporter.reportTest(testName);
            var testSuite = createTestSuite(testSuiteConstructor);
            testSuite[testName]();
        }
    }
}

module.exports = runTestSuite;
module.exports.SimpleReporter = SimpleReporter;