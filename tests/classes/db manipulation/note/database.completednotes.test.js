function databaseCompletedNotes(chai,dbpath){

    //file system
    const fs = require("fs");

    //COmpleted Note
    const CompletedNote = require("../../../../classes/note/completed.note.class");

    //completed note db class manipulation
    const CompletedNotesDb = require("../../../../classes/db_manipulation/notes/db.completed.notes.class");


    describe("TESTING DATABASE COMPLETED NOTES:",function(){

        const expect = chai.expect;

        let dbnotes;

        const customPath = dbpath;

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
            dbnotes = new CompletedNotesDb(customPath,done);
        });

        it("Class object should not be null",function(){

            expect(dbnotes).to.not.equal(null);

        });

        it("Get complted notes should return an array",function(done){

            dbnotes.getCompletedNotes()
                .then(function(array){

                    try{
                        expect(array).to.be.instanceOf(Array);
                        done();
                    }
                    catch(err){
                        done(err);
                    }
                },function(err){
                    done(err);
                })
        });

        it("Should be able to add a completed note",function(done){

            const completedNoteObj = new CompletedNote(customNoteJson);

            dbnotes.addCompletedNote(completedNoteObj)
                .then(function(){

                    //get notes
                    dbnotes.getCompletedNotes()
                        .then(function(notesDb){

                            try{
                                expect(notesDb.length).to.not.equal(0);
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

    });

}

module.exports = databaseCompletedNotes;