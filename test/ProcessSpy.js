function ProcessSpy() {
    this.hasExitedWithCode = null;

    this.exit = function (code) {
        this.hasExitedWithCode = code;
    };
}

module.exports = ProcessSpy;