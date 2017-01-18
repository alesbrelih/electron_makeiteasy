
// module holder for all classes tests //

function testClassesModule(){

    const chai = require("chai");

    //get emails class test
    require("./emails class/emails.class.test")(chai);

    //get settings class test
    require("./settings class/settings.class.test")(chai);

}

module.exports = testClassesModule;