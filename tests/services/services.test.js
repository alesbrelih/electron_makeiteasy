// ------------------------------------ //
// --- handler module for all tests --- //
// ------------------------------------ //

function servicesTest(angular){

    const chai = require("chai");
    var chaiAsPromised = require('chai-as-promised');
    const custompath = "sqlite/testingDb.sqlite";

    //connection service test
    require("./connection service/connection.service.test")(angular,chai,chaiAsPromised);

    //settings service test
    require("./settings service/settings.service.test")(angular,chai,chaiAsPromised);

    //notes service
    require("./notes service/notes.service.test")(angular,chai,custompath);

    //completed notes service
    require("./notes service/completed.notes.service.tests")(angular,chai,custompath);

    //reminder service test
    require("./reminder service/reminder.service.test")(angular,chai,custompath)
}

//export services test
module.exports = servicesTest;
