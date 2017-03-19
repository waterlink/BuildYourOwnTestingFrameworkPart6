var runTestSuite = require("../src/TestingFramework");
var SimpleProcess = require("../src/TestingFramework").SimpleProcess;
var ProcessSpy = require("./ProcessSpy");

runTestSuite(function SimpleProcessTest(t) {
    var globalProcess = new ProcessSpy();
    var process = new SimpleProcess(globalProcess);

    this.testWithoutHooks = function () {
        process.exit(0);

        t.assertEqual(0, globalProcess.hasExitedWithCode);
    };

    this.testWithoutHooks_andDifferentExitCode = function () {
        process.exit(1);

        t.assertEqual(1, globalProcess.hasExitedWithCode);
    };

    this.testCanInstallOneHook = function () {
        var aSpy = t.spy();

        process.installHook(aSpy);
        aSpy.assertNotCalled();

        process.exit(0);

        aSpy.assertCalled();
    };

    this.testCanUninstallTheHook = function () {
        var aSpy = t.spy();

        process.installHook(aSpy);
        process.uninstallHook();

        process.exit(0);

        aSpy.assertNotCalled();
    };
});