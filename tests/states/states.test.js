function testingStates(angular){


    describe("TESTING APPLICATION STATE MANAGEMENT:",function(){

        //import chai
        const chai = require("chai");

        //for better readability
        const expect = chai.expect;

        let app;
        let state;
        let location;
        let rootscope;

        beforeEach(function(){
            app = angular.mock.module("mainWrapper");
        });

        beforeEach(inject(function($injector){
            state = $injector.get("$state");
            location = $injector.get("$location");
            rootscope = $injector.get("$rootScope");


        }));

        describe("Testing Home STATE: ",function(){

            //current state var
            let currentState;

            beforeEach(function(){

                currentState = state.get("home");
            });

            //check if home state works
            it("Home state name is valid.",function(){


                expect(currentState.name).to.equal("home");

            });

            //check if correct controller
            it("Home state template is valid.",function(){

                expect(currentState.template).to.equal("<ab-index-page></ab-index-page>");

            });
        });
    });



}

module.exports = testingStates;