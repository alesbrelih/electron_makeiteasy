
// module for testing reminder class

function testingReminderClass(chai){

    const expect = chai.expect;

    //reminder class
    const Reminder = require("../../../classes/reminder/reminder.class");

    describe("TESTING REMINDER CLASS PROPERTY VALIDATION: ",function(){

        it("Should not throw any errors when valid values",function(){

            const reminderObj = new Reminder(50,12,"1,2,3,4");

            expect(reminderObj).to.not.equal(null);

        });
        it("Should not throw any errors when valid values - second test",function(){

            const reminderObj = new Reminder(50,12,"0-6");

            expect(reminderObj).to.not.equal(null);

        });

        it("Should throw err if invalid input",function(){
            expect(()=>{
                const reminderObj = new Reminder(50,11,"baba");
            }).to.throw("Days of week is not in correct format");

        })
        it("Should throw err if invalid input - second test",function(){
            expect(()=>{
                const reminderObj = new Reminder(50,11,"1-9");
            }).to.throw("Days of week is not in correct format");

        })
        it("Should throw err if invalid input - third test",function(){
            expect(()=>{
                const reminderObj = new Reminder(50,11,"1:9");
            }).to.throw("Days of week is not in correct format");

        })

    });

}

//export testing reminder class
module.exports = testingReminderClass;