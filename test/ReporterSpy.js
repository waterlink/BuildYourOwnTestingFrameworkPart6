module.exports = function ReporterSpy(assertions) {
    var reportedTestSuite = null;
    var reportedTests = [];

    this.assertHasReportedTestSuite = function (name) {
        assertions.assertTrue(
            reportedTestSuite === name,
            "Expected test suite '" + name + "' to be reported"
        );
    };

    this.assertHasReportedTest = function (name) {
        assertions.assertTrue(
            reportedTests.indexOf(name) >= 0,
            "Expected test '" + name + "' to be reported"
        )
    };

    // -- Reporter --

    this.reportTestSuite = function (name) {
        reportedTestSuite = name;
    };

    this.reportTest = function (name) {
        reportedTests.push(name);
    };
};