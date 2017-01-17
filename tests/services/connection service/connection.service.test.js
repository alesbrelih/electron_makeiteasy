////////////////////////////////////////////////////////
// --- module that tests if connected to internet --- //
// -------------------------------------------------- //
function connectionServiceTest(angular,chai,chaiAsPromised){


    chai.use(chaiAsPromised);

     describe("CONNECTION SERVICE TESTING: ",function(){

        let connectionService;

        beforeEach(angular.mock.module("mainWrapper"));

        beforeEach(inject(function($injector){

            connectionService = $injector.get("connectionService");

        }));


        it("Should be connected to internet",function(){

            let connected = connectionService.CheckConnection();

            return chai.expect(connected).to.eventually.equal(true);



        });
    });
}

module.exports = connectionServiceTest;