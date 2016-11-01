"use strict";
var httprun = require("../bin/httprun");
var argv = new Array("", //0  node
"", //1  filename
__dirname + "/testdata/target", //2
__dirname + "/testdata/source", //3
__dirname + "/testdata/source/pages-link_xXxXx.txt", //4
"_xXxXx", //5 File Separator
"main-pages_xXxXx.html" //6 Main html file name
);
describe('httprun', function () {
    var subject;
    beforeEach(function () {
        subject = new httprun.HttpRun.BuildProcess(argv);
    });
    describe('#checkDirectorySync', function () {
        it('should return true for exist directory', function () {
            var result = subject.checkDirectorySync(argv[3]);
            if (result !== true) {
                throw new Error('Expected diretory already exist - ' + result);
            }
        });
        it('should return false for non-exist directory', function () {
            var result = subject.checkDirectorySync(argv[2]);
            if (result !== false) {
                throw new Error('Expected directory doesn\'t exit - ' + result);
            }
        });
    });
    describe('#createDirectory', function () {
        it('To create a new directory.', function () {
            subject.createDirectory(argv[2] + '/bg/css');
        });
        it('New directory should be create.', function () {
            var result = subject.checkDirectorySync(argv[2] + '/bg/css');
            if (result !== true) {
                throw new Error('Expected a new directory should be create - ' + result);
            }
        });
    });
});
//# sourceMappingURL=index.js.map