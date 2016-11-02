#! /usr/bin/env node
"use strict";
import * as httprun from "./httprun";
class Main{
    constructor(argv:Array<string>){
     var obj:httprun.HttpRun.BuildProcess =  new httprun.HttpRun.BuildProcess(argv);
     obj.startNow();
    }
}
export = new Main(process.argv);