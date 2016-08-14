var runTestSuite = require("../src/TestingFramework");

runTestSuite(function (t) {
    this.testItCallsAllTestMethods = function () {
        var spyOne = t.spy();
        var spyTwo = t.spy();
        var spyThree = t.spy();

        runTestSuite(function (t) {
            this.testFunctionOne = spyOne;
            this.testFunctionTwo = spyTwo;
            this.testFunctionThree = spyThree;
        });

        spyOne.assertCalled();
        spyTwo.assertCalled();
        spyThree.assertCalled();
    };

    this.testItDoesNotCallMethodThatDoesNotStartWithTestPrefix = function () {
        var aSpy = t.spy();

        runTestSuite(function (t) {
            this.someFunction = aSpy;
        });

        aSpy.assertNotCalled();
    };
});