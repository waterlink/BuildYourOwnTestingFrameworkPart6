var runTestSuite = require("../src/TestingFramework");

runTestSuite(function (t) {
    this.testSuccess = function () {
        t.assertTrue(true);
    };

    this.testFailure = function () {
        try {
            t.assertTrue(false);
        } catch (error) {
            t.assertEqual("Expected to be true, but got false", error.message);
        }
    };

    this.testCustomFailureMessage = function () {
        try {
            t.assertTrue(false, "it is not true!");
        } catch (error) {
            t.assertEqual("it is not true!", error.message);
        }
    };

    this.testCustomFailureMessage_withOtherMessage = function () {
        try {
            t.assertTrue(false, "should be true");
        } catch (error) {
            t.assertEqual("should be true", error.message);
        }
    };
});