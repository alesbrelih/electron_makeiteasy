// --- completed notes service module --- //
function completedNotesServiceModule(app){

    //get completed notes db class
    const CompletedNotesDb = require("../../../classes/db_manipulation/notes/db.completed.notes.class");

    const CompletedNote = require("../../../classes/note/completed.note.class");

    //controller
    function completedNotesServiceController($rootScope){

        //returned singleton
        const notesFactory = {};

        // --- privates --- //

        //db class
        let db = new CompletedNotesDb();

        //properties for factory
        const _notes = [];


        // --- publics --- //

        //gets notes
        notesFactory.GetCompletedNotes = ()=>{

            //returned promise
            const promise = new Promise(function(resolve,reject){

                db.getCompletedNotes()
                    .then(function(notes){

                        $rootScope.$apply(function(){
                            //clear array of notes
                            while(_notes.length>0){
                                _notes.pop()
                            }

                            //add new notes
                            for(let note of notes){
                                _notes.push(note);
                            }

                        });
                        resolve(notes);

                    },function(err){
                        //on err reject err
                        reject(err);
                    })
            })

            //return promise
            return promise;
        }

        //refresh indicates if main list needs to refresh if adding successful
        notesFactory.AddCompletedNote = (description,refresh) =>{

            //returned promise
            const promise = new Promise(function(resolve,reject){

                //get new id
                db.getNextId()
                    .then(function(id){

                        //json object of note to be inserted
                        const noteJSON = {
                            ID:id,
                            DESCRIPTION:description
                        }

                        //create class object
                        const noteObj = new CompletedNote(noteJSON);

                        //add to db
                        db.addCompletedNote(noteObj)
                            .then(function(){

                                //if user wants to refresh properties note list
                                if(refresh && refresh == true){
                                    notesFactory.GetCompletedNotes()
                                        .then(function(){
                                            resolve();
                                        },function(err){
                                            reject(err);
                                        })

                                }
                                else{
                                    //if no refresh just resolve
                                    resolve();
                                }


                            },function(err){
                                reject(err);
                            })


                    },function(err){
                        reject(err);
                    })




            });

            //return promise
            return promise;
        };

        //put custom dbpath
        notesFactory.SetPath = (custompath,cb) =>{

            //set custom path, major use in testing
            db = new CompletedNotesDb(custompath,cb);

        }

        //bind properties value
        notesFactory.Notes = _notes;

        //return singleton
        return notesFactory;
    }

    //register service
    app.factory("completedNotesService",completedNotesServiceController);
}

//export deff for usage
module.exports = completedNotesServiceModule;