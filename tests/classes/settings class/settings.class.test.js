// ---- testing settings class ---- //

function testingSettingClass(chai){


    const Settings = require("../../../classes/settings/settings.class");
    const expect = chai.expect;

    describe("TESTING SETTINGS CLASS",function(){

        let settingsObject;
        let inputJson = {
            emails:[
                {
                    username:"ales",
                    password:"ales"
                },
                {
                    username:"marjan",
                    password:"marjan"
                }
            ]
        }

        beforeEach(function(){

            settingsObject = new Settings(inputJson);

        })

        it("Should not be null when initialized.",function(){

            expect(settingsObject).to.not.equal(null);

        });

        it("Emails should have length of 2.",function(){

            const emailsLength = settingsObject.getEmails().length;

            expect(emailsLength).to.equal(2);
        });

        it("Should have added email succesfully",function(){

            //new email info
            const email = {
                username:"Testing",
                password:"Testing"
            };

            settingsObject.addEmail(email);

            expect(settingsObject.getEmails().length).to.equal(3);
        })
    });
}

module.exports = testingSettingClass;