"use strict";
import * as fs from "fs-extra";
import * as readline from "readline";
import * as url from "url";
import * as path from "path";

class HttpRun {
    private targetPath:string;
	private sourcePath:string;
	private urlFilePath:string;
	private jsSeprator:string;
	private mainFilePath:string;
    //
    constructor(argv:Array<string>){
        if(argv.length!== 7) this.exitCode("#Error - Invalid arguemnt passed.");
        this.targetPath = argv[2];
        this.sourcePath = argv[3];
        this.urlFilePath = argv[4];
        this.jsSeprator = argv[5];
        this.mainFilePath = argv[6];
        //
        //

        this.startNow();
    }

    private startNow():void{
         if(!this.checkDirectorySync(this.sourcePath)) this.exitCode("#Error - Source directory not present.");
         if(!this.checkDirectorySync(this.targetPath)){
              this.createDirectory(this.targetPath);
         };
         if(!this.checkDirectorySync(this.urlFilePath)) this.exitCode("#Error - urlFilePath directory not present.");
         this.readURLFile(this.urlFilePath);

         this.createDirectory(path.join(this.targetPath,"investor-relations/overview"));
      
    }

    private createDirectory(directory:string):void{
      // if(!fs.existsSync(directory)){
           fs.mkdirSync(directory); 
       //}
    }

    private checkDirectorySync(directory:string):boolean {  
        try {
            fs.statSync(directory);
            return true
        } catch(e) {
            return false;
        }
    }

    private exitCode(msg:string):void{
        console.log(msg);
       // process.exit(1);
    }

    private readURLFile(urlFilePath:string):void{
        const rl = readline.createInterface({
            input: fs.createReadStream(urlFilePath),
            output: process.stdout
        });
        rl.on('line', (input) => {
            this.parseUrl(input);
        });

        rl.on("close",function(){
        });
    }


    private parseUrl(strUrl:string):void{
        var pathname:string = url.parse(strUrl).pathname;
        console.log("### pathname",pathname);
        var fileName:string = pathname.substr(pathname.lastIndexOf("/")+1,pathname.length);
        var rootPath:string = pathname.substr(0,pathname.lastIndexOf("/"));
        var srcPath:string = this.sourcePath+"/"+fileName;
        var trgPath:string = this.targetPath+pathname;
        if(rootPath.trim() !== ""){
           // this.createDirectory("C:/Users/prashant/prashant/development/utility-webpage-nodejs/target/investor-relations/overview");
           console.log(path.join(this.targetPath,rootPath));
          //  this.createDirectory(path.join(this.targetPath,rootPath));
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
        
    }




}

new HttpRun(process.argv)