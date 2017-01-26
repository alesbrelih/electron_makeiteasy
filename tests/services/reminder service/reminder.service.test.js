
// --- REMINDER SERVICE TEST MODULE --- //

function reminderServiceTestModule(angular,chai,custompath){

    describe("TESTING REMINDER SERVICE: ",function(){

        let app,reminderService,state;

        const fs = require("fs");
        const expect = chai.expect;
        const Reminder = require("../../../classes/reminder/reminder.class")

        let reminderObj = new Reminder("TEST",30,10);
        let daysArray = [1,2,3,4];
        reminderObj.DaysArray = daysArray;

        beforeEach(function(){
            app = angular.mock.module("mainWrapper");
        });

        beforeEach(inject(function($injector){
            reminderService = $injector.get("reminderService");
            state = $injector.get("$state");
        }));
        beforeEach(function(done){
            if(fs.existsSync(custompath))
            {
                fs.unlinkSync(custompath);
            }
            reminderService.SetPath(custompath,done);
        });
        beforeEach(function(){
            state.go("home");
        })
        beforeEach(function(done){
            reminderService.AddCronJob(reminderObj)
                .then(()=>{
                    done();
                })
        })

        it("Cron holders array should be initialized.",function(){
            let holdersArray = reminderService.CronHolders();
            expect(holdersArray).to.be.instanceOf(Array);
            expect(holdersArray.length).to.be.equal(1);
        })

    });


}

//export test
module.exports = reminderServiceTestModule;