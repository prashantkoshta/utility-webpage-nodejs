"use strict";
import * as httprun from "../bin/httprun";

var argv:Array<string> =new Array(
             "", //0  node
             "", //1  filename
             __dirname+"/testdata/target", //2
             __dirname+"/testdata/source", //3
             __dirname+"/testdata/source/pages-link_xXxXx.txt", //4
             "_xXxXx", //5 File Separator
             "main-pages_xXxXx.html" //6 Main html file name
);

describe('httprun', () => {
    var subject : httprun.HttpRun.BuildProcess;
    beforeEach(function () {
         subject = new httprun.HttpRun.BuildProcess(argv);
    });

    describe('#checkDirectorySync', () => {
        it('should return true for exist directory', () => {
            var result : boolean = subject.checkDirectorySync(argv[3]);
            if (result !== true) {
                throw new Error('Expected diretory already exist - ' + result);
            }
        });

        it('should return false for non-exist directory', () => {
            var result : boolean = subject.checkDirectorySync(argv[2]);
            if (result !== false) {
            throw new Error('Expected directory doesn\'t exit - ' + result);
            }
        });

    });

    describe('#createDirectory', () => {
        it('To create a new directory.', () => {
            subject.createDirectory(argv[2]+'/bg/css');
        });

        it('New directory should be create.', () => {
            var result : boolean = subject.checkDirectorySync(argv[2]+'/bg/css');
            if (result !== true) {
            throw new Error('Expected a new directory should be create - ' + result);
            }
        });
    });

   

  


});