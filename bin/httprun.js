"use strict";
var fs = require("fs");
var readline = require("readline");
var url = require("url");
var path = require("path");
var process = require("process");
var HttpRun;
(function (HttpRun) {
    var BuildProcess = (function () {
        function BuildProcess(argv) {
            if (argv.length !== 7)
                this.exitCode("#Error - Invalid arguemnt passed.");
            this.targetPath = argv[2];
            this.sourcePath = argv[3];
            this.urlFilePath = argv[4];
            this.jsSeprator = argv[5];
            this.mainFileName = argv[6];
        }
        BuildProcess.prototype.startNow = function () {
            if (!this.checkDirectorySync(this.sourcePath))
                this.exitCode("#Error - Source directory not present.");
            if (!this.checkDirectorySync(this.targetPath)) {
                this.createDirectory(this.targetPath);
            }
            ;
            if (!this.checkDirectorySync(this.urlFilePath))
                this.exitCode("#Error - urlFilePath directory not present.");
            this.readURLFile(this.urlFilePath);
        };
        BuildProcess.prototype.createDirectory = function (directory) {
            directory = path.join(directory);
            var dirList = directory.split("\\");
            var len = dirList.length;
            var strPath = dirList[0];
            for (var i = 1; i < len; i++) {
                strPath = path.join(strPath, dirList[i]);
                if (!fs.existsSync(strPath)) {
                    fs.mkdirSync(strPath);
                }
            }
        };
        BuildProcess.prototype.checkDirectorySync = function (directory) {
            try {
                directory = path.join(directory);
                fs.statSync(directory);
                return true;
            }
            catch (e) {
                //console.log(e);
                return false;
            }
        };
        BuildProcess.prototype.exitCode = function (msg) {
            console.log(msg);
            process.exit(1);
        };
        BuildProcess.prototype.readURLFile = function (urlFilePath) {
            var _this = this;
            var ref = this;
            var rl = readline.createInterface({
                input: fs.createReadStream(urlFilePath),
                output: process.stdout
            });
            rl.on('line', function (input) {
                _this.parseUrl(input);
            });
            rl.on("close", function () {
                ref.moveFiles(ref.sourcePath + "/" + ref.mainFileName, ref.targetPath + "/main-pages_xXxXx.html");
                console.log("---------------\nSucessfully Created Directory Structure. Refer above path:\n---------------");
            });
        };
        BuildProcess.prototype.parseUrl = function (strUrl) {
            var pathname = url.parse(strUrl).pathname;
            var fileName = pathname.substr(pathname.lastIndexOf("/") + 1, pathname.length);
            var rootPath = pathname.substr(0, pathname.lastIndexOf("/"));
            var srcPath = this.sourcePath + "/" + fileName;
            var trgPath = this.targetPath + pathname;
            trgPath = trgPath.substring(0, trgPath.lastIndexOf(this.jsSeprator));
            if (rootPath.trim() !== "") {
                this.createDirectory(path.join(this.targetPath, rootPath));
            }
            this.moveFiles(srcPath, trgPath);
        };
        BuildProcess.prototype.moveFiles = function (srcPath, trgPath) {
            if (this.checkDirectorySync(srcPath)) {
                var source = fs.createReadStream(srcPath);
                var desti = fs.createWriteStream(trgPath);
                source.pipe(desti, { end: false });
                source.on('end', function () {
                    fs.unlinkSync(srcPath);
                });
                source.on('error', function (er) {
                    console.log(er);
                });
            }
        };
        return BuildProcess;
    }());
    HttpRun.BuildProcess = BuildProcess;
})(HttpRun = exports.HttpRun || (exports.HttpRun = {}));
