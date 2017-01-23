function completedNotesServiceTests(angular,chai,custompath){



    describe("TESTING COMPLETED NOTES SERVICE: ",function(){

        //define chai expect
        const expect = require("chai").expect;

        let app, completedNotesService;

        //init app
        beforeEach(function(){
            app = angular.mock.module("mainWrapper");
        });

        //set notes service
        beforeEach(inject(function($injector){

            completedNotesService = $injector.get("completedNotesService");

        }));

        //change path
        beforeEach(function(done){

            completedNotesService.SetPath(custompath,done);

        });

        it("Service factory shouldnt be null",function(){

            expect(completedNotesService).to.not.equal(null);

        });

        it("Should return array for GetCompletedNotes",function(done){

            completedNotesService.GetCompletedNotes()
                .then(function(notes){
                    try{
                        expect(notes).to.be.instanceOf(Array);
                        done();
                    }
                    catch(err){
                        done(err);
                    }
                },function(err){
                    done(err);
                });

        });

        //adding completed note
        it("Should be able to add a new completed note.",function(done){

            const descriptionTest = "TESTING IF ADDING COMPLETED WORKS"

            completedNotesService.AddCompletedNote(descriptionTest)
                .then(function(){

                    completedNotesService.GetCompletedNotes()
                        .then(function(dbnotes){

                            try{
                                expect(dbnotes.length).to.not.equal(0);
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
    })



}

module.exports = completedNotesServiceTests;