//get base class
const DbConnection = require("../base/db.connection.class");

//sqlite
const sqlite = require("sqlite3").verbose();

//note class
const Note = require("../../note/note.class");

//database notes
class DatabaseNotes extends DbConnection{

    //constructor
    constructor(custompath,cb){


        super(custompath,cb);


    }

    //gets notes
    //cb is callback
    getNotes(){

        const dbNotes = this;
        const promise = new Promise(function(resolve,reject){

            let notes = [];

             //gets dbpatch from db connection class
            const db = new sqlite.Database(dbNotes.dbpath);

            //serialize call
            db.serialize(function(){
                const statement = db.prepare("SELECT * FROM NOTE");

                //get each row
                statement.each(function(err,row){
                    if(err){
                        reject(err);
                    }
                    //added note
                    notes.push(new Note(row));
                },function(err){
                    if(err)
                    {
                        reject(err);
                    }
                    else{
                        resolve(notes);
                    }

                });

                statement.finalize();

            });

            //close connection
            db.close();

        });
        return promise;

    }

    //get note from id parameter
    getNote(_id){

        //this object ref
        const dbNotes = this;

        //returned promise
        const promise = new Promise(function(resolve,reject){

            //sql
            const sql = "SELECT * FROM NOTE WHERE ID=(?)";

            //db ref
            const db = new sqlite.Database(dbNotes.dbpath);

            db.serialize(function(){

                //statement
                const statement = db.prepare(sql);

                statement.get(_id,function(err,row){

                    if(err){
                        reject(err);
                    }
                    else{
                        if(row){

                            const newNote = new Note(row);
                            resolve(newNote);

                        }
                        else{
                            reject("No matching notes");
                        }
                    }
                    resolve()

                });

                //finalize
                statement.finalize();



            })
            db.close();


        });

        //return promise
        return promise;

    }

    //remove note from db, using its id
    removeNote(_id){

        //get current object ref
        const notesDb = this;

        //async promise to delete note
        const promise = new Promise(function(resolve,reject){
            //db path
            const db = new sqlite.Database(notesDb.dbpath);

            db.serialize(function(){

                 //execute query
                const statement = db.prepare("DELETE FROM NOTE WHERE ID=(?)");

                //run statement
                statement.run(_id,err=>{
                    //if err
                    if(err){
                        reject(err);
                    }
                    //successful execution
                    resolve();
                });

                statement.finalize();



            })
            //close db
            db.close();

        })

        return promise;


    }

    //add note to db
    addNote(note){
        const dbNotes = this;

        const promise = new Promise(function(resolve,reject){

            //create db object
            const db = new sqlite.Database(dbNotes.dbpath);

            db.serialize(function(){

                //prepare statement
                const statement = db.prepare("INSERT INTO NOTE (ID,DESCRIPTION) VALUES ((?),(?))");

                statement.run(note.Id,note.Description,err=>{
                    //if err throw err
                    if(err){
                        reject(err);
                    }
                    //call cb if statement run successful
                    resolve();
                })

                //finalize statement
                statement.finalize();


            });

            //close db
            db.close();
        });

        //return promise
        return promise;



    }

    editNote(note){

        //object ref
        const notesDb = this;

        const promise = new Promise(function(resolve,reject){

            //db object
            const db = new sqlite.Database(notesDb.dbpath);

            db.serialize(function(){

                //prepare statement
                const statement = db.prepare("UPDATE NOTE SET DESCRIPTION=$description WHERE ID=$id;");


                const params = {

                    $description:note.Description,
                    $id:note.Id

                }

                //run statement and callback if success
                statement.run(params,function(err){
                    if(err){

                        reject(err);
                    }
                    else{

                        resolve();
                    }

                })

                //finalize
                statement.finalize();

            })


            //Close db
            db.close();
        })

        //return promise
        return promise;
    }
}

//export class
module.exports = DatabaseNotes;
