
// module for testing reminder class

function testingReminderClass(chai){

    const expect = chai.expect;

    //reminder class
    const Reminder = require("../../../classes/reminder/reminder.class");

    describe("TESTING REMINDER CLASS PROPERTY VALIDATION: ",function(){

        it("Should not throw any errors when valid values",function(){

            const reminderObj = new Reminder("TEST",50,12);
            reminderObj.setDaysFromString("1,2,3,4");

            expect(reminderObj).to.not.equal(null);
            expect(reminderObj.DaysArray.length).to.equal(4);

        });
        it("Should not throw any errors when valid values - second test",function(){

            const reminderObj = new Reminder("TEST",50,12);
            reminderObj.setDaysFromString("1");

            expect(reminderObj).to.not.equal(null);


        });

        it("Should throw err if invalid input",function(){
            const reminderObj = new Reminder("TEST",50,11);
            expect(()=>{
                reminderObj.setDaysFromString("baba");
            }).to.throw("Days of week is not in correct format");

        })
        it("Should throw err if invalid input - second test",function(){
            const reminderObj = new Reminder("TEST",50,11);
            expect(()=>{
                reminderObj.setDaysFromString("1-9");
            }).to.throw("Days of week is not in correct format");

        })
        it("Should throw err if invalid input - third test",function(){
            const reminderObj = new Reminder("TEST",50,11);
            expect(()=>{
                reminderObj.setDaysFromString("1:9");
            }).to.throw("Days of week is not in correct format");

        })

    });

}

//export testing reminder class
module.exports = testingReminderClass;