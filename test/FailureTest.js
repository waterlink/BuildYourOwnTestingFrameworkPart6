var runTestSuite = require("../src/TestingFramework");
var ProcessSpy = require("./ProcessSpy");
var ReporterSpy = require("./ReporterSpy");

runTestSuite(function FailureTest(t) {
    var process = new ProcessSpy();
    var reporter = new ReporterSpy();
    var options = {
        process: process,
        reporter: reporter,
        silenceFailures: true
    };

    this.testItDoesNotBubbleUpExceptions = function () {
        var aSpy = t.spy();

        t.assertNotThrow(function () {
            runTestSuite(function (t) {
                this.testFailure = function () {
                    t.assertTrue(false);
                };

                this.testSomething = aSpy;
            }, options);
        });

        aSpy.assertCalled();
    };

    this.testItExitsWithProcessCodeOne = function () {
        runTestSuite(function (t) {
            this.testFailure = function () {
                t.assertTrue(false);
            };
        }, options);

        t.assertEqual(1, process.hasExitedWithCode);
    };

    this.testItExitsWithProcessCodeZero_onSuccess = function () {
        runTestSuite(function (t) {
            this.testFailure = function () {
                t.assertTrue(true);
            };
        }, options);

        t.assertEqual(0, process.hasExitedWithCode);
    };
}, {verifyAllTestsRun: true});