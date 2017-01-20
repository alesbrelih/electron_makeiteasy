// get config file for db path
const config = require("../../../config/config");

//sqlite3 ref
const sqlite = require("sqlite3").verbose();

//file system
const fs = require("fs");

//private function that creates tables if file was just created
function prepareTables(dbpath,cb){
    // prepare table //
    const sql = "CREATE TABLE NOTE("+
                "ID INT PRIMARY KEY NOT NULL,"+
                "DESCRIPTION TEXT NOT NULL);";


    //connect to file
    const db = new sqlite.Database(dbpath);

    db.serialize(function(){

         //run sql to create table
        db.run(sql,function(){
            if(cb){
                cb();
            }
        });

    });
    db.close();





}

//define class
class DbConnection{

    //custom path for unit testing option
    constructor(custompath,callback){

        //custom path wasn't defined so use config constant
        if(!custompath){
            this.dbpath = config.dbpath;
        }
        else{
            //custom path was defined
            this.dbpath = custompath;
        }

        //test if file exists else create
        fs.exists(this.dbpath,exists=>{

            if(!exists){
                //create file
                const streamId = fs.openSync(this.dbpath, 'w');
                fs.closeSync(streamId);

                //create tables in file
                prepareTables(this.dbpath,callback);
            }
            else{
                //callback if it exists
                callback();
            }
        });
    }

    //returns db path string
    getDbPath(){
        return this.dbpath;
    }

}

//export class
module.exports = DbConnection;