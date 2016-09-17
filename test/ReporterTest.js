var TestingFramework = require("../src/TestingFramework");
var runTestSuite = TestingFramework;
var SimpleReporter = TestingFramework.SimpleReporter;

var FakeReporter = require("./FakeReporter");

const IMPLEMENTATIONS = [
    SimpleReporter,
    FakeReporter
];

IMPLEMENTATIONS.forEach(function (ReporterImplementation) {
    runTestSuite(function (t) {
        var reporter = new ReporterImplementation();

        this.testDefines_reportTestSuite = function () {
            var reportTestSuite = reporter.reportTestSuite;
            t.assertEqual("function", typeof(reportTestSuite));
            t.assertEqual(1, reportTestSuite.length);
        };

        this.testDefines_reportTest = function () {
            var reportTest = reporter.reportTest;
            t.assertEqual("function", typeof(reportTest));
            t.assertEqual(1, reportTest.length);
        }
    });
});