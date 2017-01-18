// ------------------------------------ //
// --- handler module for all tests --- //
// ------------------------------------ //

function servicesTest(angular){

    const chai = require("chai");
    var chaiAsPromised = require('chai-as-promised');

    //connection service test
    require("./connection service/connection.service.test")(angular,chai,chaiAsPromised);

    //settings service test
    require("./settings service/settings.service.test")(angular,chai,chaiAsPromised);

}

//export services test
module.exports = servicesTest;
