var runTestSuite = require("../src/TestingFramework");

runTestSuite(function (t) {
    this.testSuccess = function () {
        t.assertNotThrow(function () {
            t.assertFalse(false);
        });
    };

    this.testFailure = function () {
        t.assertThrow("Expected to be false, but got true", function () {
            t.assertFalse(true);
        });
    };

    this.testFailure_withCustomMessage = function () {
        t.assertThrow("custom error message", function () {
            t.assertFalse(true, "custom error message");
        });
    };
});