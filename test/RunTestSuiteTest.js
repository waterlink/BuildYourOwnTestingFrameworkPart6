var runTestSuite = require("../src/TestingFramework");
var ReporterSpy = require("./ReporterSpy");
var ProcessSpy = require("./ProcessSpy");

runTestSuite(function RunTestSuiteTest(t) {
    var reporter = new ReporterSpy(t);
    var process = new ProcessSpy(t);
    var options = {
        reporter: reporter,
        process: process
    };

    this.testItCallsAllTestMethods = function () {
        var spyOne = t.spy();
        var spyTwo = t.spy();
        var spyThree = t.spy();

        runTestSuite(function (t) {
            this.testFunctionOne = spyOne;
            this.testFunctionTwo = spyTwo;
            this.testFunctionThree = spyThree;
        }, options);

        spyOne.assertCalled();
        spyTwo.assertCalled();
        spyThree.assertCalled();
    };

    this.testItDoesNotCallMethodThatDoesNotStartWithTestPrefix = function () {
        var aSpy = t.spy();

        runTestSuite(function (t) {
            this.someFunction = aSpy;
        }, options);

        aSpy.assertNotCalled();
    };

    this.testItOutputsNameOfTheTest = function () {
        runTestSuite(function TestSuiteName(t) {
            this.testSomeTestName = function () {};
            this.testSomeOtherTestName = function () {};
        }, options);

        reporter.assertHasReportedTestSuite("TestSuiteName");
        reporter.assertHasReportedTest("testSomeTestName");
        reporter.assertHasReportedTest("testSomeOtherTestName");
    };

    this.testItOutputsOtherNameOfTheTest = function () {
        runTestSuite(function EntirelyDifferentTestSuiteName(t) {
            this.testADifferentTestName = function () {};
            this.testAnInterestingTestName = function () {};
        }, options);

        reporter.assertHasReportedTestSuite("EntirelyDifferentTestSuiteName");
        reporter.assertHasReportedTest("testADifferentTestName");
        reporter.assertHasReportedTest("testAnInterestingTestName");
    };

    this.testItCanHaveCustomNameOfTheTestSuite = function () {
        runTestSuite(function (t) {
            this.getTestSuiteName = function () {
                return "CustomNameOfTheTestSuite";
            };
        }, options);

        reporter.assertHasReportedTestSuite("CustomNameOfTheTestSuite");
    };

    this.testItCanHaveCustomNameOfTheTestSuite_withDifferentName = function () {
        runTestSuite(function (t) {
            this.getTestSuiteName = function () {
                return "DifferentTestSuiteName";
            };
        }, options);

        reporter.assertHasReportedTestSuite("DifferentTestSuiteName");
    };
}, {verifyAllTestsRun: true});