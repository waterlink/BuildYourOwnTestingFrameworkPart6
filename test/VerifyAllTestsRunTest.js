var runTestSuite = require("../src/TestingFramework");
var ReporterSpy = require("./ReporterSpy");
var ProcessSpy = require("./ProcessSpy");

runTestSuite(function VerifyAllTestsRunTest(t) {
    var reporter = new ReporterSpy(t);
    var process = new ProcessSpy(t);

    this.testVerifyAllTestsRun = function () {
        t.assertThrow("Expected all tests to run", function () {

            runTestSuite(function SuiteWithTwoTests(t) {

                this.testWithRunTestSuite = function () {
                    runTestSuite(function (t) {
                        this.testOne = function () {};
                    }, {reporter: reporter});
                };

                this.testThatShouldAlsoRun = function () {};

            }, {reporter: reporter,
                process: process,
                verifyAllTestsRun: true});

        });
    };

    this.testVerifyAllTestsRun_withoutFailure = function () {
        t.assertNotThrow(function () {

            runTestSuite(function SuiteWithTwoTests(t) {

                this.testWithRunTestSuite = function () {
                    runTestSuite(function (t) {
                        this.testOne = function () {};
                    }, {reporter: reporter,
                        process: process});
                };

                this.testThatShouldAlsoRun = function () {};

            }, {reporter: reporter,
                process: process,
                verifyAllTestsRun: true});

        });
    };
});