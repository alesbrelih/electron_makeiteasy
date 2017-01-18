const Email = require("../emails/emails.class");

class SettingsClass{

    //privates

    //constructor from settingsJson
    constructor(settingsJson){

        //emails holder
        this.emails = [];

        //get all emails
        for(let email of settingsJson.emails){

            let emailObj = new Email(email);

            this.emails.push(emailObj);

        }

    }

    //get emails array
    getEmails(){
        return this.emails;
    }

}

module.exports = SettingsClass;