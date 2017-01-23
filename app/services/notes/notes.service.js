
// needed modules

//classes
const NoteDatabase = require("../../../classes/db_manipulation/notes/db.notes.class");
const Note = require("../../../classes/note/note.class");



// --- note service module --- //

function noteServiceModule(app){

    //returned controller
    function noteServiceController(dialogService,completedNotesService,$rootScope){


        //returned singleton
        const notesFactory = {};

        //notes holder
        const _notes = [];

        //note db class
        let notesDb = new NoteDatabase();


        // list of notes
        notesFactory.GetNotes = ()=>{

            //get notes promise
            const promise = new Promise(function(resolve,reject){

                notesDb.getNotes()
                    .then(function(notesDb){

                        $rootScope.$apply(function(){

                            //Clear notes array if full
                            while(_notes.length>0){
                                _notes.pop();
                            }
                            for(let note of notesDb){
                                _notes.push(note);
                            }

                        })

                        resolve(notesDb);
                    })
                    .catch(err=>{
                        reject(err);
                    });
            });

            //get notes
            return promise;

        }

        // add new note
        notesFactory.AddNote = (note,refresh)=>{

            //promise
            const promise = new Promise(function(resolve,reject){

                //get next id
                const nextIdPromise = notesDb.getNextId();
                nextIdPromise.then(function(id){

                    //set id
                    note.ID = id;

                    const noteObj = new Note(note);

                    //add note to db
                    notesDb.addNote(noteObj)
                        .then(function(){
                            if(refresh && refresh === true){
                                notesFactory.GetNotes()
                                    .then(function(){
                                        resolve();
                                    },function(err){
                                        reject(err);
                                    })
                            }
                            else{
                                resolve();
                            }

                        },function(err){
                            reject(err);
                        })
                })
                //catch errs
                .catch(err=>{
                    reject(err);
                });


            });

            //returned promise
            return promise;

        }

        //removes note with given id
        notesFactory.RemoveNote = (noteId,refresh)=>{

            const promise = new Promise(function(resolve,reject){

                notesDb.removeNote(noteId)
                    .then(()=>{
                        //if array needs to be refreshed
                        if(refresh && refresh === true){
                            notesFactory.GetNotes()
                                .then(function(){
                                    resolve();
                                },function(err){
                                    reject(err);
                                })
                        }
                        else{
                            resolve();
                        }
                    })
                    .catch(err=>{
                        reject(err);
                    })
            });
            return promise;
        }

        //edit note
        notesFactory.EditNote = (note,refresh)=>{

            //promise
            const promise = new Promise(function(resolve,reject){
                 notesDb.editNote(note)
                    .then(function(){

                        if(refresh && refresh == true){

                            notesFactory.GetNotes()
                                .then(function(){

                                    resolve();
                                },function(err){
                                    reject(err);
                                })
                        }
                        else{
                            resolve();
                        }
                    })
                    .catch(err=>{
                        reject(err);
                    })
            });

            //return promise
            return promise;
        }

        //confirm note
        notesFactory.CompleteNote = (note,refresh)=>{

            //promise
            const promise = new Promise(function(resolve,reject){

                //add to completed
                completedNotesService.AddCompletedNote(note.Description,refresh)
                    .then(function(){

                        //if successfull remove from normal notes
                        notesFactory.RemoveNote(note.Id,refresh)
                            .then(function(){
                                resolve();
                            },
                            function(err){
                                reject(err);
                            })

                    },function(err){
                        reject(err);
                    })

            })

            //return
            return promise;

        }

        // ACTIONS WITH CONFIRMATION NEEDED //

        //confirm edit before proceeding
        notesFactory.EditConfirm = (note,refresh,cb) =>{

                dialogService.Dialog("edit","note",()=>{
                    const editPromise = notesFactory.EditNote(note,refresh);

                    //if callback needed
                    if(cb){
                        editPromise.then(function(){
                            cb();
                        })
                    }
                });




        };

        //confirm remove note before proceeding
        notesFactory.RemoveConfirm = (id,refresh) =>{
            dialogService.Dialog("delete","note",()=>{
                notesFactory.RemoveNote(id,refresh);

            });
        };

        //confirm add
        notesFactory.AddConfirm = (description,refresh,cb) =>{
            dialogService.Dialog("add","note",()=>{
                //note json Object
                const noteObject = {
                    DESCRIPTION:description
                }

                //add note
                const addPromise = notesFactory.AddNote(noteObject,refresh);

                //if callback needed
                if(cb){
                    addPromise.then(()=>{
                        cb();
                    })
                }
            })
        };

        //confirm complete with cb option
        notesFactory.CompleteConfirm = (note,refresh,cb) =>{
            dialogService.Dialog("complete","note",()=>{
                const completePromise =notesFactory.CompleteNote(note,refresh);

                //if callback needed
                if(cb){
                    completePromise.then(function(){
                        cb();
                    })
                }
            });
        }

        //change path for db method
        notesFactory.SetPath = (customPath,cb) =>{

            notesDb = new NoteDatabase(customPath,cb);

        };

        //confirm

        //nots ref
        notesFactory.Notes = _notes;

        return notesFactory;
    }

    noteServiceController.$inject = ["dialogService","completedNotesService","$rootScope"];

    //register service / factory
    app.factory("notesService",noteServiceController);
}

//export note service module
module.exports = noteServiceModule;