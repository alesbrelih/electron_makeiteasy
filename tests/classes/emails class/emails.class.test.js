function emailsClassTest(chai){

    //chai expect reference
    const expect = chai.expect;

    const Email = require("../../../classes/emails/emails.class");

    describe("TESTING EMAIL CLASS:",function(){

        it("Should not be null once initialized: ",function(){

            const testJsonEmail = {
                username:"ales",
                password:"ales"
            }
            const emailTest = new Email(testJsonEmail);
            expect(emailTest).to.not.equal(null);

        });

        it("Should have correct username.",function(){

            const testJsonEmail = {
                username:"ales",
                password:"ales"
            }
            const emailTest = new Email(testJsonEmail);
            expect(emailTest.getUsername()).to.equal("ales");

        });

        it("Should have correct password.",function(){

            const testJsonEmail = {
                username:"ales",
                password:"alesales"
            }
            const emailTest = new Email(testJsonEmail);
            expect(emailTest.getPassword()).to.equal("alesales");

        });
    })

}

module.exports = emailsClassTest;