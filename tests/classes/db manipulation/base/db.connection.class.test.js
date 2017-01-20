function testDbConnection(chai){

    let dbConnection;

    //get chai expect
    const expect = chai.expect;

    //fs
    const fs = require("fs");

    //needed class
    const DbConnection = require("../../../../classes/db_manipulation/base/db.connection.class");

    //path for testing creation of files
    const testDbPath = "sqlite/testingDb.sqlite";

    const sqlite = require("sqlite3").verbose();

    //Db var holder
    let db;




    //testing db connection class
    describe("TESTING DB CONNECTION CLASS: ",function(){

        //delete test db file before each test
        beforeEach(function(done){
            const exists = fs.existsSync(testDbPath);
            if(exists){
                //delete test db file if exists
                fs.unlinkSync(testDbPath);
            }

            dbConnection = new DbConnection(testDbPath,done);
        })


        //creates file if doesnt exist
        it("Should create file if it doesnt exists: ",function(){

            const exist = fs.existsSync(testDbPath);
            expect(exist).to.equal(true);


        });

        //should have right ammount of tables
        it("Should have proper ammount of tables.",function(done){
            db = new sqlite.Database(testDbPath);

            db.get("SELECT count(*) FROM main.sqlite_master WHERE type='table';",function(err,row){
                if(err)
                {
                    throw err;
                }
                const val = row["count(*)"];
                expect(val).to.equal(1);
                done();
            });
            db.close();

        });

    });


}

module.exports = testDbConnection;