
// --- db reminder class tests --- //

function dbReminderClassTest(chai,custompath){

    const expect = chai.expect;

    //file system
    const fs = require("fs");

    //import class
    const Reminder = require("../../../../classes/reminder/reminder.class");

    //import db class
    const ReminderDbClass = require("../../../../classes/db_manipulation/reminder/db.reminder.class");



    let reminderdb;

    describe("TESTNG DB REMINDERS CLASS: ",function(){


        //create new db class and erase existing db file
        beforeEach(function(done){
            //delete db if exists
            if(fs.existsSync(custompath)){
                fs.unlinkSync(custompath);
            }
            reminderdb = new ReminderDbClass(custompath,done);
        });



        it("Once initialized, returned object shouldnt be null, returned object should be an array.",function(){
            expect(reminderdb).to.not.equal(null);
        });
        it("getReminders should return empty array at initialization",function(done){

            reminderdb.getReminders()
                .then(function(reminders){
                    try{
                        expect(reminders).to.be.instanceOf(Array);
                        done();
                    }
                    catch(err){
                        done(err);
                    }
                },function(err){
                    done(err);
                })
        });
        it("Shoudl return 1 as the next id after initialization",function(done){

            reminderdb.getNextId()
                .then(function(id){
                    try{
                        expect(id).to.equal(1);
                        done();
                    }
                    catch(err){
                        done(err);
                    }
                },function(err){
                    done(err);
                });
        });

        it("Should be able to add a new reminder",function(done){

            //set object
            let reminderObj = new Reminder(30,10);
            let daysArray = [1,2,3,4];
            reminderObj.DaysArray = daysArray;

            reminderdb.getNextId()
                .then(function(id){
                    reminderObj.Id = id;
                    reminderdb.addReminder(reminderObj)
                        .then(function(){
                            reminderdb.getReminders()
                                .then(function(reminders){

                                    try{

                                        const reminder = reminders[0];
                                        expect(reminders.length).to.equal(1);
                                        expect(reminder.Minute).to.equal(30);
                                        expect(reminder.Days).to.equal("1,2,3,4");
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
                });
        });

        it("Should be able to remove a reminder from db",function(done){

            //set object
            let reminderObj = new Reminder(30,10);
            let daysArray = [1,2,3,4];
            reminderObj.DaysArray = daysArray;

            reminderdb.getNextId()
                .then(function(id){
                    reminderObj.Id = id;
                    reminderdb.addReminder(reminderObj)
                        .then(function(){

                            reminderdb.removeReminder(id)
                                .then(function(){

                                    reminderdb.getReminders()
                                        .then(function(reminders){

                                            try{
                                                expect(reminders.length).to.equal(0);
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

                },function(err){
                    done(err);
                })

        });

        it("Should be able to edit a reminder",function(done){

            //set object
            let reminderObj = new Reminder(30,10);
            let daysArray = [1,2,3,4];
            reminderObj.DaysArray = daysArray;

            reminderdb.getNextId()
                .then(function(id){
                    reminderObj.Id = id;
                    reminderdb.addReminder(reminderObj)
                        .then(function(){
                            reminderObj.Minute = 50;
                            reminderdb.editReminder(reminderObj)
                                .then(function(){
                                    reminderdb.getReminders()
                                        .then(function(reminders){

                                            try{

                                                const changed = reminders[0];
                                                expect(changed.Minute).to.equal(50);
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
                        })

                },function(err){
                    done(err);
                });

        });

    })

}


//export test module
module.exports = dbReminderClassTest;