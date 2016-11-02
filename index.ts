"use strict";
import * as process from "process";
import * as httprun from "./bin/httprun";
class Main{
    constructor(argv:Array<string>){
     var obj:httprun.HttpRun.BuildProcess =  new httprun.HttpRun.BuildProcess(argv);
     obj.startNow();
    }
}

export = new Main(process.argv);