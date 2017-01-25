
// --- cron manager test module --- //

function cronManagerTest(){



    describe("TESTING CRON MANAGER: ",function(){

        const expect = require("chai").expect;
        const custompath = "sqlite/testingDb.sqlite";
        const fs = require("fs");
        const Reminder = require("../../classes/reminder/reminder.class");

        //test object
        let reminderObj = new Reminder(30,10);
        let daysArray = [1,2,3,4];
        reminderObj.DaysArray = daysArray;

        //get cron manager
        const CronManager = require("../../cron_manager/cron.manager");

        let cronmanager;

        beforeEach(function(){
            //init singleton
            cronmanager = CronManager.getInstance();
        })
        //change path
        beforeEach(function(done){
            if(fs.existsSync(custompath)){
                fs.unlinkSync(custompath);
            }
            cronmanager.SetPath(custompath,done);
        })

        it("Cronmanager singleton shouldn't be null",function(){
            expect(cronmanager).to.not.equal(null);
        })

        it("Get reminders method should return an array.",function(done){
            cronmanager.GetReminders()
                .then(function(reminders){
                    try{
                        expect(reminders).to.not.equal(null);
                        expect(reminders).to.be.instanceof(Array);
                        done();
                    }
                    catch(err){
                        done(err);
                    }

                },function(err){
                    done(err);
                })
        });

        it("Should be able to add a cronjob",function(done){

            cronmanager.AddCronJob(reminderObj)
                .then(()=>{
                    try{
                        const cronHolderArray = cronmanager.CronHolders();
                        expect(cronHolderArray.length).to.equal(1);
                        done();
                    }
                    catch(err){
                        done(err);
                    }
                },(err)=>{
                    done(err);
                })
        });

        it("Should be able to delete a cronjob",function(done){

            cronmanager.GetReminders()
                .then(function(){
                    cronmanager.AddCronJob(reminderObj)
                        .then(function(){
                            let id = cronmanager.CronHolders()[0].Reminder.Id;
                            cronmanager.RemoveCronJob(id)
                                .then(function(){
                                    try{
                                        expect(cronmanager.CronHolders().length).to.equal(0);
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


        });

        it("Should be able to edit a cronjob",function(done){

            cronmanager.GetReminders()
                .then(function(){

                    cronmanager.AddCronJob(reminderObj)
                        .then(function(){

                            const obj = cronmanager.CronHolders()[0];
                            obj.Reminder.Minute = 50;

                            cronmanager.EditCronJob(obj)
                                .then(function(){
                                    try{
                                        const objEdit = cronmanager.CronHolders()[0];
                                        expect(objEdit.Reminder.Minute).to.equal(50);
                                        expect(objEdit.CronJob.running).to.not.equal(null);
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
                    reject(err);
                });

        });

    });

}


module.exports = cronManagerTest;