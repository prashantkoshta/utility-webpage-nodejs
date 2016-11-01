"use strict";
var process = require("process");
var httprun = require("./bin/httprun");
var Main = (function () {
    function Main(argv) {
        var obj = new httprun.HttpRun.BuildProcess(argv);
        obj.startNow();
    }
    return Main;
}());
exports.Main = Main;
module.exports = new Main(process.argv);
//# sourceMappingURL=index.js.map