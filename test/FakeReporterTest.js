var runTestSuite = require("../src/TestingFramework");
var FakeReporter = require("./FakeReporter");

runTestSuite(function FakeReporter_BehaviorTest(t) {
    var reporter = new FakeReporter(t);

    this.testAssertHasReportedTestSuite_whenFailing = function () {
        reporter._reset();
        t.assertThrow("Expected test suite 'HelloWorld' to be reported", function () {
            reporter.assertHasReportedTestSuite("HelloWorld");
        });
    };

    this.testAssertHasReportedTestSuite_whenFailing_withOtherName = function () {
        reporter._reset();
        t.assertThrow("Expected test suite 'OtherTestSuite' to be reported", function () {
            reporter.assertHasReportedTestSuite("OtherTestSuite");
        });
    };

    this.testAssertHasReportedTestSuite_whenSucceeding = function () {
        reporter._reset();
        t.assertNotThrow(function () {
            reporter.reportTestSuite("HelloWorld");
            reporter.assertHasReportedTestSuite("HelloWorld");
        });
    };

    this.testAssertHasReportedTestSuite_whenReporting_andFailing = function () {
        reporter._reset();
        t.assertThrow("Expected test suite 'HelloWorld' to be reported", function () {
            reporter.reportTestSuite("OtherTestSuite");
            reporter.assertHasReportedTestSuite("HelloWorld");
        });
    };

    this.testAssertHasReportedTestSuite_whenReporting_andFailing = function () {
        reporter._reset();
        t.assertThrow("Expected test suite 'OtherTestSuite' to be reported", function () {
            reporter.reportTestSuite("HelloWorld");
            reporter.assertHasReportedTestSuite("OtherTestSuite");
        });
    };

    this.testAssertHasReportedTest_whenFailing = function () {
        reporter._reset();
        t.assertThrow("Expected test 'testName' to be reported", function () {
            reporter.assertHasReportedTest("testName");
        });
    };

    this.testAssertHasReportedTest_whenFailing_withDifferentName = function () {
        reporter._reset();
        t.assertThrow("Expected test 'testDifferentName' to be reported", function () {
            reporter.assertHasReportedTest("testDifferentName");
        });
    };

    this.testAssertHasReportedTest_whenSucceeding = function () {
        reporter._reset();
        t.assertNotThrow(function () {
            reporter.reportTest("testName");
            reporter.assertHasReportedTest("testName");
        });
    };

    this.testAssertHasReportedTest_whenReporting_andFailing = function () {
        reporter._reset();
        t.assertThrow("Expected test 'testName' to be reported", function () {
            reporter.reportTest("testOtherName");
            reporter.assertHasReportedTest("testName");
        });
    };

    this.testAssertHasReportedTest_whenReporting_andFailing_withOtherName = function () {
        reporter._reset();
        t.assertThrow("Expected test 'testDifferentName' to be reported", function () {
            reporter.reportTest("testName");
            reporter.assertHasReportedTest("testDifferentName");
        });
    };

    this.testAssertHasReportedTest_whenSucceeding_withMultipleReports = function () {
        reporter._reset();
        t.assertNotThrow(function () {
            reporter.reportTest("testName");
            reporter.reportTest("testOtherName");
            reporter.assertHasReportedTest("testName");
        });
    };
});