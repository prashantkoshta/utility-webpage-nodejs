"use strict";
var fs = require("fs-extra");
var readline = require("readline");
var url = require("url");
var path = require("path");
var HttpRun = (function () {
    //
    function HttpRun(argv) {
        if (argv.length !== 7)
            this.exitCode("#Error - Invalid arguemnt passed.");
        this.targetPath = argv[2];
        this.sourcePath = argv[3];
        this.urlFilePath = argv[4];
        this.jsSeprator = argv[5];
        this.mainFilePath = argv[6];
        //
        //
        this.startNow();
    }
    HttpRun.prototype.startNow = function () {
        if (!this.checkDirectorySync(this.sourcePath))
            this.exitCode("#Error - Source directory not present.");
        if (!this.checkDirectorySync(this.targetPath)) {
            this.createDirectory(this.targetPath);
        }
        ;
        if (!this.checkDirectorySync(this.urlFilePath))
            this.exitCode("#Error - urlFilePath directory not present.");
        this.readURLFile(this.urlFilePath);
        this.createDirectory(path.join(this.targetPath, "investor-relations/overview"));
    };
    HttpRun.prototype.createDirectory = function (directory) {
        // if(!fs.existsSync(directory)){
        fs.mkdirSync(directory);
        //}
    };
    HttpRun.prototype.checkDirectorySync = function (directory) {
        try {
            fs.statSync(directory);
            return true;
        }
        catch (e) {
            return false;
        }
    };
    HttpRun.prototype.exitCode = function (msg) {
        console.log(msg);
        // process.exit(1);
    };
    HttpRun.prototype.readURLFile = function (urlFilePath) {
        var _this = this;
        var rl = readline.createInterface({
            input: fs.createReadStream(urlFilePath),
            output: process.stdout
        });
        rl.on('line', function (input) {
            _this.parseUrl(input);
        });
        rl.on("close", function () {
        });
    };
    HttpRun.prototype.parseUrl = function (strUrl) {
        var pathname = url.parse(strUrl).pathname;
        console.log("### pathname", pathname);
        var fileName = pathname.substr(pathname.lastIndexOf("/") + 1, pathname.length);
        var rootPath = pathname.substr(0, pathname.lastIndexOf("/"));
        var srcPath = this.sourcePath + "/" + fileName;
        var trgPath = this.targetPath + pathname;
        if (rootPath.trim() !== "") {
            // this.createDirectory("C:/Users/prashant/prashant/development/utility-webpage-nodejs/target/investor-relations/overview");
            console.log(path.join(this.targetPath, rootPath));
        }
        // console.log("tar------",trgPath);
        // console.log("src------",srcPath);
        /* if(this.checkDirectorySync(srcPath)){
             
             var source = fs.createReadStream(srcPath);
             var desti = fs.createWriteStream(trgPath);
             source.pipe(desti,{ end: false });
 
             source.on('end',function() {
                fs.unlinkSync(srcPath);
             });
 
             source.on('error',function(er) {
                console.log(er);
             });
         }*/
    };
    return HttpRun;
}());
new HttpRun(process.argv);
//# sourceMappingURL=index.js.map