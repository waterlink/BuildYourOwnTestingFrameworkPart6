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

function runTestSuite(testSuiteConstructor) {
    var testSuite = new testSuiteConstructor(assertions);

    for (var testName in testSuite) {
        if (testName.match(/^test/)) {
            testSuite[testName]();
        }
    }
}

module.exports = runTestSuite;