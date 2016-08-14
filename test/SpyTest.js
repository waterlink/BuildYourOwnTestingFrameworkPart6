var runTestSuite = require("../src/TestingFramework");

runTestSuite(function (t) {
    this.testIsNotCalledInitially = function () {
        t.assertNotThrow(function () {
            t.spy().assertNotCalled();
        });
    };

    this.testAssertNotCalledFailsWhenWasCalled = function () {
        var aSpy = t.spy();
        aSpy();

        t.assertThrow("Expected not to be called", function () {
            aSpy.assertNotCalled();
        });
    };

    this.testIsCalledAfterBeingCalled = function () {
        var aSpy = t.spy();
        aSpy();

        t.assertNotThrow(function () {
            aSpy.assertCalled();
        });
    };

    this.testAssertCalledFailsWhenWasNotCalled = function () {
        t.assertThrow("Expected to be called", function () {
            t.spy().assertCalled();
        });
    };
});