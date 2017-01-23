
// NEEDED MODULES //

//db connection base class
const DbConn = require("../base/db.connection.class");

//sqlite module
const sqlite = require("sqlite3");

//completedNote class
const CompletedNote = require("../../note/completed.note.class");

//exported class
class DatabaseCompletedNotes extends DbConn{

    //constructor
    constructor(custompath,cb){
        super(custompath,cb);
    }

    //get database completed notes
    getCompletedNotes(){

        //ref to this object
        const self = this;

        //sql statement
        const sql = "SELECT * FROM COMPLETED_NOTES";

        //doing it async
        const promise = new Promise(function(resolve,reject){

            //resolved array of completed notes
            let completed = [];

            //create db ref
            const db = new sqlite.Database(self.getDbPath());

            db.serialize(function(){
                //prepare statement
                const statement = db.prepare(sql);

                statement.each(function(err,row){
                    if(err){
                        //reject promise if err
                        reject(err);
                    }
                    else{
                        //add row info to completed
                        const completedNote = new CompletedNote(row);
                        completed.push(completedNote);

                    }
                },function(err){
                    if(err){
                        reject(err);
                    }
                    else{
                        resolve(completed);
                    }
                })

                statement.finalize(function(err){
                    if(err){
                        reject(err);
                    }
                })
            });

            //close db connection
            db.close();
        });

        //return promise;
        return promise;

    }

    //get next id of completed notes
    getNextId(){

        //object ref
        const self = this;

        //sql statement
        const sql = "SELECT MAX(ID) FROM COMPLETED_NOTES";

        //returned promise
        const promise = new Promise(function(resolve,reject){

            //db ref
            const db = new sqlite.Database(self.getDbPath());

            db.serialize(function(){

                //prepare statement
                const statement = db.prepare(sql);

                statement.get(function(err,row){
                    if(err){
                        reject(err);
                    }
                    else{
                        //next id is max +1
                        const nextId = row["MAX(ID)"]+1;
                        resolve(nextId);
                    }
                })

                //finalize statement
                statement.finalize();

            });

            //close db
            db.close();

        })

        return promise;

    }

    //add new completed note
    addCompletedNote(note){

        //object ref
        const self = this;

        //sql NEEDED
        const sql = "INSERT INTO COMPLETED_NOTES(ID,DESCRIPTION,DATE) VALUES (?,?,(SELECT date('now')))";

        //returned promise
        const promise = new Promise(function(resolve,reject){

            //db ref
            const db = new sqlite.Database(self.getDbPath());

            //serialize
            db.serialize(function(){

                const statement = db.prepare(sql);

                statement.run(note.Id,note.Description,function(err){
                    if(err){
                        reject(err);
                    }

                });

                statement.finalize(function(err){
                    if(err){
                        reject(err);

                    }
                    else{
                        resolve();
                    }
                });

            });

            //close connection
            db.close();

        });


        return promise;
    }

}

//export class
module.exports = DatabaseCompletedNotes;