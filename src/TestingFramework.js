var assertions = {
    assertTrue: function (condition, message) {
        var errorMessage = "Expected to be true, but got false";

        if (message) {
            errorMessage = message;
        }

        if (!condition) {
            throw new Error(errorMessage);
        }
    },
    
    assertEqual: function (expected, actual) {
        this.assertTrue(
            expected == actual,
            "Expected to equal " + expected + ", but got: " + actual
        );
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