var runTestSuite = require("../src/TestingFramework");

runTestSuite(function (t) {
    this.testSuccess = function () {
        t.assertNotThrow(function () {
            t.assertThrow("an error message", function () {
                throw new Error("an error message");
            });
        });
    };

    this.testSuccess_withDifferentExpectedMessage = function () {
        t.assertNotThrow(function () {
            t.assertThrow("a different error message", function () {
                throw new Error("a different error message");
            });
        });
    };

    this.testFailure = function () {
        t.assertThrow("Expected to equal an error message, but got: a different error message", function () {
            t.assertThrow("an error message", function () {
                throw new Error("a different error message");
            });
        });
    };

    this.testFailure_whenActionDoesNotThrow = function () {
        t.assertThrow("Expected to throw an error, but nothing was thrown", function () {
            t.assertThrow("an error message", function () {
                // does nothing
            });
        });
    };

    this.testThrows_whenActionDoesNotThrow = function () {
        var hasThrown = false;

        try {
            t.assertThrow("an error message", function () {
                // does nothing
            });
        } catch (error) {
            hasThrown = true;
        }

        t.assertTrue(hasThrown, "it should have thrown");
    };
});