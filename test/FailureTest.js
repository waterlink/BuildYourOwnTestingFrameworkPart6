var runTestSuite = require("../src/TestingFramework");
var ProcessSpy = require("./ProcessSpy");

runTestSuite(function FailureTest(t) {
    var processSpy = new ProcessSpy();

    this.testItDoesNotBubbleUpExceptions = function () {
        var aSpy = t.spy();

        t.assertNotThrow(function () {
            runTestSuite(function (t) {
                this.testFailure = function () {
                    t.assertTrue(false);
                };

                this.testSomething = aSpy;
            }, {process: processSpy, silenceFailures: true});
        });

        aSpy.assertCalled();
    };

    this.testItExitsWithProcessCodeOne = function () {
        runTestSuite(function (t) {
            this.testFailure = function () {
                t.assertTrue(false);
            };
        }, {process: processSpy, silenceFailures: true});

        t.assertEqual(1, processSpy.hasExitedWithCode);
    };

    this.testItExitsWithProcessCodeZero_onSuccess = function () {
        runTestSuite(function (t) {
            this.testFailure = function () {
                t.assertTrue(true);
            };
        }, {process: processSpy, silenceFailures: true});

        t.assertEqual(0, processSpy.hasExitedWithCode);
    };
});