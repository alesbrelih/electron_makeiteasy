// tests all db manipulation classes
function dbManipulationTests(){

    const chai = require("chai");
    const chaiAsPromised = require("chai-as-promised");

    const customPath = "sqlite/testingDb.sqlite";

    //testing base class
    require("./base/db.connection.class.test")(chai);

    //testing db notes class
    require("./note/databasenotes.test")(chai,chaiAsPromised);

    //testing completed notes db class
    require("./note/database.completednotes.test")(chai,customPath)

    //testing reminders db class
    require("./reminder/db.reminder.class.test")(chai,customPath);

}

module.exports = dbManipulationTests;