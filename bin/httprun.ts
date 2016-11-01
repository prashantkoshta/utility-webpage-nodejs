"use strict";
import * as fs from "fs";
import * as readline from "readline";
import * as url from "url";
import * as path from "path";
import * as process from "process";

export namespace HttpRun {

    export class BuildProcess {
        private targetPath:string;
        private sourcePath:string;
        private urlFilePath:string;
        private jsSeprator:string;
        private mainFileName:string;

        constructor(argv:Array<string>){
            if(argv.length!== 7) this.exitCode("#Error - Invalid arguemnt passed.");
            this.targetPath = argv[2];
            this.sourcePath = argv[3];
            this.urlFilePath = argv[4];
            this.jsSeprator = argv[5];
            this.mainFileName = argv[6];          
        }

        public startNow():void{
            if(!this.checkDirectorySync(this.sourcePath)) this.exitCode("#Error - Source directory not present.");
            if(!this.checkDirectorySync(this.targetPath)){
                this.createDirectory(this.targetPath);
            };
            if(!this.checkDirectorySync(this.urlFilePath)) this.exitCode("#Error - urlFilePath directory not present.");
            this.readURLFile(this.urlFilePath);
        }

        private createDirectory(directory:string):void{
            directory = path.join(directory);
            let dirList:Array<string> = directory.split("\\");
            let len:number = dirList.length;
            let strPath:string = dirList[0];
            for(let i=1;i<len;i++){
                strPath = path.join(strPath,dirList[i]);
                if(!fs.existsSync(strPath)){
                    fs.mkdirSync(strPath); 
                }
            }      
        }

        private checkDirectorySync(directory:string):boolean {
            try {
                directory = path.join(directory);
                fs.statSync(directory);
                return true
            } catch(e) {
                //console.log(e);
                return false;
            }
        }

        private exitCode(msg:string):void{
            console.log(msg);
            process.exit(1);
        }

        private readURLFile(urlFilePath:string):void{
            var ref = this;
            const rl = readline.createInterface({
                input: fs.createReadStream(urlFilePath),
                output: process.stdout
            });
            rl.on('line', (input) => {
                this.parseUrl(input);
            });

            rl.on("close",function(){
                ref.moveFiles(ref.sourcePath+"/"+ref.mainFileName,ref.targetPath+"/main-pages_xXxXx.html");
                console.log("---------------\nSucessfully Created Directory Structure. Refer above path:\n---------------");
            });
        }


        private parseUrl(strUrl:string):void{
            let pathname:string = url.parse(strUrl).pathname;
            var fileName:string = pathname.substr(pathname.lastIndexOf("/")+1,pathname.length);
            var rootPath:string = pathname.substr(0,pathname.lastIndexOf("/"));
            var srcPath:string = this.sourcePath+"/"+fileName;
            var trgPath:string = this.targetPath+pathname;
            trgPath = trgPath.substring(0,trgPath.lastIndexOf(this.jsSeprator));
            if(rootPath.trim() !== ""){
                this.createDirectory(path.join(this.targetPath,rootPath));
            }
            this.moveFiles(srcPath,trgPath);
        }

        private moveFiles(srcPath:string,trgPath:string){
            if(this.checkDirectorySync(srcPath)){
                var source = fs.createReadStream(srcPath);
                var desti = fs.createWriteStream(trgPath);
                source.pipe(desti,{ end: false });
                source.on('end',function() {
                    fs.unlinkSync(srcPath);
                });
                source.on('error',function(er) {
                    console.log(er);
                });
            }
        }

    }
}