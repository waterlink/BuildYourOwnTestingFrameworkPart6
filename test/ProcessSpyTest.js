var runTestSuite = require("../src/TestingFramework");
var ProcessSpy = require("./ProcessSpy");

runTestSuite(function ProcessSpy_BehaviorTest(t) {
    var processSpy = new ProcessSpy();

    this.testHasExitedWithCode_initiallyIsNull = function () {
        t.assertEqual(null, processSpy.hasExitedWithCode);
    };

    this.testHasExitedWithCode_isZero_afterExitZeroCall = function () {
        processSpy.exit(0);
        t.assertEqual(0, processSpy.hasExitedWithCode);
    };

    this.testHasExitedWithCode_isOne_afterExitOneCall = function () {
        processSpy.exit(1);
        t.assertEqual(1, processSpy.hasExitedWithCode);
    };
});