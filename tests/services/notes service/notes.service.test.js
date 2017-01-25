
// -- notes service testng module -- //

function noteserviceTestModule(angular,chai,custompath){



    describe("TESTING NOTES SERVICE: ",function(){

        const expect = chai.expect;

        let app,notesService, notes;

        //note without id
        const note = {
            DESCRIPTION:"WOWOWOWO2"
        }

        beforeEach(function(){
            app = angular.mock.module("mainWrapper");
        }



        );

        beforeEach(inject(function($injector){

            notesService = $injector.get("notesService");

        }));

        beforeEach(function(done){
            notesService.SetPath(custompath,done);
        })

        it("NotesService object and its functions should not be null",function(){

            expect(notesService).to.not.equal(null);
            expect(notesService.GetNotes).to.not.equal(null);

        });

        it("NotesService GetNotes should return an array",function(done){

            notesService.GetNotes()
                .then(function(notes){

                    try{
                        expect(notes).to.not.equal(null);
                        expect(notes).to.be.instanceOf(Array);
                        done();
                    }
                    catch(err){
                        done(err);
                    }
                })
                .catch(function(err){
                    done(err);
                })

        });

        it("Should be able to add notes to db",function(done){



            const promise = notesService.AddNote(note);

            promise.then(function(){

                const getNumber = notesService.GetNotes();

                getNumber.then(function(notes){

                    try{
                        const notesLength = notes.length;
                        expect(notesLength).to.not.equal(0);
                        done();
                    }
                    catch(err){
                        done(err);
                    }

                })

            })
            .catch(function(err){
                done(err);
            });

        });

        it("Should be able to remove a note",function(done){

            //add note

            const addNotePromise = notesService.AddNote(note);

            addNotePromise.then(function(){

                notesService.GetNotes()
                .then(function(notes){
                    const arraylength = notes.length;
                    const lastId = notes[notes.length-1].Id;
                    notesService.RemoveNote(lastId)
                        .then(function(){

                                notesService.GetNotes()
                                    .then(function(notes){

                                        try{
                                            expect(notes.length).to.equal(arraylength-1);
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
                            });

                },function(err){
                    done(err);
                });

            },
            function(err){
                done(err);
            })



        });

        it("Should be able to edit a note",function(done){

            const addNotePromise = notesService.AddNote(note);

            addNotePromise.then(function(){
                notesService.GetNotes()
                    .then(function(notes){

                        const last = notes[notes.length-1];

                        last.Description = "Changed by edit hello";

                        notesService.EditNote(last)
                            .then(function(){

                                notesService.GetNotes()
                                    .then(function(notes){

                                        try{
                                            expect(notes[notes.length-1].Description).to.equal("Changed by edit hello");
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

                },function(err){
                    done(err);
                })

        })

            },function(err){
                done(err);
            })
    });



}

module.exports = noteserviceTestModule;