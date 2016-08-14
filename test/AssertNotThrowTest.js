var runTestSuite = require("../src/TestingFramework");

runTestSuite(function (t) {
    this.testSuccess = function () {
        t.assertNotThrow(function () {
            t.assertNotThrow(function () {
                // do nothing
            });
        });
    };

    this.testFailure = function () {
        t.assertThrow("Expected not to throw error, but thrown 'error message'", function () {
            t.assertNotThrow(function () {
                throw new Error("error message");
            });
        });
    };

    this.testFailure_withDifferentMessage = function () {
        t.assertThrow("Expected not to throw error, but thrown 'different error message'", function () {
            t.assertNotThrow(function () {
                throw new Error("different error message");
            });
        });
    };
});