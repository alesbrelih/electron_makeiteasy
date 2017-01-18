////////////////////////////////////
// --- Needed modules .-----------//
////////////////////////////////////
const secrets = require("../../config/keys");
const cryptoR = require("crypto");

// emails object definition

class EmailsObject{

    constructor(email){

        //create cipher / decipher
        this.cipher = cryptoR.createCipher('aes192', secrets.cryptKey);
        this.decipher = cryptoR.createDecipher('aes192',secrets.cryptKey);

        //set username and password
        this.username = email.username;
        this.setPassword(email.password);

    }


    //get username
    getUsername(){

        return this.username;

    }

    //get decrypted password
    getPassword(){

        var encrypted = this.password;
        var decrypted = this.decipher.update(encrypted, 'hex', 'utf8');
        decrypted += this.decipher.final('utf8');

        return decrypted;

    }

    //set username
    setUsername(_username){

        this.username = _username;

    }

    //set password
    setPassword(_password){

        var encrypted = this.cipher.update(_password, 'utf8', 'hex');
        encrypted += this.cipher.final('hex');

        //encrypt and set password
        this.password = encrypted;
    }

}

module.exports = EmailsObject;