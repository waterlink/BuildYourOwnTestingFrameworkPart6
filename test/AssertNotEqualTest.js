var runTestSuite = require("../src/TestingFramework");

runTestSuite(function (t) {
    this.testSuccess = function () {
        t.assertNotThrow(function () {
            t.assertNotEqual(42, 57);
        });
    };

    this.testFailure = function () {
        t.assertThrow("Expected not to equal 42, but got: 42", function () {
            t.assertNotEqual(42, 42);
        });
    };

    this.testFailure_withDifferentValue = function () {
        t.assertThrow("Expected not to equal hello, but got: hello", function () {
            t.assertNotEqual("hello", "hello");
        });
    };

    this.testSpecialValues = function () {
        t.assertNotThrow(function () {
            t.assertNotEqual("0", 0);
        });
    };
});