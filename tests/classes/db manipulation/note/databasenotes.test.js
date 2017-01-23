//database notes tests


function databasenoteTests(chai,chaiaspromised){




    //note class ref
    const Note = require("../../../../classes/note/note.class");

    //dbnotes class
    const DbNotes = require("../../../../classes/db_manipulation/notes/db.notes.class");

    const fs = require("fs");



    describe("TESTING DATABASENOTE CLASS:",function(){
        const expect = chai.expect;

        let dbnotes;

        const customPath = "sqlite/testingDb.sqlite";

        const customNoteJson = {
            ID:1,
            DESCRIPTION:"First note i saw in the navy."
        };

        beforeEach(function(done){
            //delete test db if exists
            const exists = fs.existsSync(customPath);
            if(exists){
                //delete test db file if exists
                fs.unlinkSync(customPath);
            }
            dbnotes = new DbNotes(customPath,done);
        });



        //testing that returns empty array once initialized
        it("Should return empty array once initialized from a new db file.",function(done){

            //get notes
            let notes = dbnotes.getNotes();

            //async call
            notes.then(function(success){
                const length = success.length;
                try{
                    expect(length).to.equal(0);
                    done()
                }
                catch(err){
                    done(err);
                }

            },function(err){
                done(err);
            });
        });

        //testing if adding notes can be done
        it("Should be able to add a new note.",function(done){

            //create new note object
            const note = new Note(customNoteJson);

            //add new note
            const addPromise = dbnotes.addNote(note);

            addPromise.then(function(){

                //get new notes length
                const notesPromise = dbnotes.getNotes();

                notesPromise.then(function(notes){

                    //check if length == 1
                    const length = notes.length;

                    try{
                        expect(length).to.equal(1);
                        done();
                    }
                    catch(err){
                        done(err);
                    }

                },function(err){
                    done(err);
                })

            },function(err){
                done(err);
            })

        });

        //should be able to delete note from db
        it("Should be able to delete note from db.",function(done){

            //create new note object
            const note = new Note(customNoteJson);

            //add new note
            const addPromise = dbnotes.addNote(note);

            addPromise.then(function(){

                //delete added note
                const removePromise = dbnotes.removeNote(note.Id);

                removePromise.then(function(){

                    //lenght should stay 0
                    const notesPromise = dbnotes.getNotes();

                    notesPromise.then(function(notes){

                        const length = notes.length;

                        try{
                            expect(length).to.equal(0);
                            done();
                        }
                        catch(err){
                            done(err);
                        }

                    })

                },function(err){
                    done(err);
                })

            },function(err){
                done(err);
            })

        });

        //should be able to get note
        it("Should be able to get a single note from id",function(done){

            //const new note
            const note = new Note(customNoteJson);

            //add note promise
            const addPromise = dbnotes.addNote(note);

            addPromise.then(function(){

                //one added, try to get it

                const getNote = dbnotes.getNote(customNoteJson.ID);

                getNote.then(function(noteObj){

                    try{
                        //check to match
                        expect(noteObj.Id).to.equal(customNoteJson.ID);
                        expect(noteObj.Description).to.equal(customNoteJson.DESCRIPTION);
                        done()
                    }
                    catch(err){
                        done(err);
                    }

                })


            },function(err){
                done(err);
            })

        });

        //should be able to edit note description
        it("Should be able to edit notes descripton.",function(done){


            //add new
            const newNote = new Note(customNoteJson);

            //add note promise
            const addPromise = dbnotes.addNote(newNote);

            addPromise.then(function(){

                const editedText = "WOW IT GOT EDITED";

                //get note from db
                const getNotePromise = dbnotes.getNote(customNoteJson.ID);

                //on returned
                getNotePromise.then(function(note){

                    //set description
                    note.Description = editedText;

                    //save edited
                    const editedPromise = dbnotes.editNote(note);

                    editedPromise.then(function(){

                        //try to get note from db and check value
                        const getNoteEditedPromise = dbnotes.getNote(customNoteJson.ID);
                        getNoteEditedPromise.then(function(value){

                            try{
                                expect(value.Id).to.equal(customNoteJson.ID);
                                expect(value.Description).to.equal(editedText);
                                done();
                            }
                            catch(err){
                                done(err);
                            }

                        },function(err){
                            done(err);
                        });

                    },function(err){
                        done(err);
                    })

                },function(err){
                    done(err);
                })


            },function(err){
                done(err);
            })

        });

        //should get next id
        it("Should return next id in notes",function(done){

            //add new
            const newNote = new Note(customNoteJson);

            //add note promise
            const addPromise = dbnotes.addNote(newNote);

            addPromise.then(function(){

                const getIdPromise = dbnotes.getNextId();

                getIdPromise.then(function(id){

                    try{
                        expect(id).to.equal(2);
                        done();
                    }
                    catch(err){
                        done(err);
                    }

                },function(err){
                    done(err);
                });

            },
            function(err){
                done(err);
            })
        })

    })

}

module.exports = databasenoteTests;