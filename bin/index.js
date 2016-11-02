#! /usr/bin/env node
"use strict";
var httprun = require("./httprun");
var Main = (function () {
    function Main(argv) {
        var obj = new httprun.HttpRun.BuildProcess(argv);
        obj.startNow();
    }
    return Main;
}());
module.exports = new Main(process.argv);
//# sourceMappingURL=index.js.map