var runTestSuite = require("../src/TestingFramework");
var FakeReporter = require("./FakeReporter");

runTestSuite(function RunTestSuiteTest(t) {
    var reporter = new FakeReporter(t);

    this.testItCallsAllTestMethods = function () {
        var spyOne = t.spy();
        var spyTwo = t.spy();
        var spyThree = t.spy();

        runTestSuite(function (t) {
            this.testFunctionOne = spyOne;
            this.testFunctionTwo = spyTwo;
            this.testFunctionThree = spyThree;
        }, {reporter: reporter});

        spyOne.assertCalled();
        spyTwo.assertCalled();
        spyThree.assertCalled();
    };

    this.testItDoesNotCallMethodThatDoesNotStartWithTestPrefix = function () {
        var aSpy = t.spy();

        runTestSuite(function (t) {
            this.someFunction = aSpy;
        }, {reporter: reporter});

        aSpy.assertNotCalled();
    };

    this.testItOutputsNameOfTheTest = function () {
        runTestSuite(function TestSuiteName(t) {
            this.testSomeTestName = function () {};
            this.testSomeOtherTestName = function () {};
        }, {reporter: reporter});

        reporter.assertHasReportedTestSuite("TestSuiteName");
        reporter.assertHasReportedTest("testSomeTestName");
        reporter.assertHasReportedTest("testSomeOtherTestName");
    };

    this.testItOutputsOtherNameOfTheTest = function () {
        runTestSuite(function EntirelyDifferentTestSuiteName(t) {
            this.testADifferentTestName = function () {};
            this.testAnInterestingTestName = function () {};
        }, {reporter: reporter});

        reporter.assertHasReportedTestSuite("EntirelyDifferentTestSuiteName");
        reporter.assertHasReportedTest("testADifferentTestName");
        reporter.assertHasReportedTest("testAnInterestingTestName");
    };

    this.testItCanHaveCustomNameOfTheTestSuite = function () {
        runTestSuite(function (t) {
            this.getTestSuiteName = function () {
                return "CustomNameOfTheTestSuite";
            };
        }, {reporter: reporter});

        reporter.assertHasReportedTestSuite("CustomNameOfTheTestSuite");
    };
});