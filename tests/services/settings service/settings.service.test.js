function settingsServiceTest(angular,chai,chaiaspromised){

    const should = chai.should();

    chai.use(chaiaspromised);

    //variables needed
    let app, settingsService;

    describe("TESTING SETTINGS SERVICE: ",function(){

        beforeEach(function(){

            app = angular.mock.module("mainWrapper");

        });

        beforeEach(inject(function($injector){

            settingsService = $injector.get("settingsService");


        }));

        // settings service should not be null
        it("Settings service should not be null.",function(){

           settingsService.should.not.equal(null);

        });

        // check if what getemailaddresses return isnt null
        it("Returned object settings should not be null.",function(){

           const settingConfig = settingsService.GetSettingsConfig();
           return settingConfig.should.eventually.not.equal(null);

        });

        //check if settings object is set once json is returned
        it("Get setting should work.",function(done){

            settingsService.GetSettingsConfig().then(function(){
                let object = settingsService.GetSettings();
                object.should.not.equal(null);
                done()
            },
            function(){
                done();
            });

        });

        //check if writes successfully
        it("Should write successfully - length of arrays before and after match.",function(done){

            settingsService.GetSettingsConfig().then(function(){

                const objectFirst = settingsService.GetSettings();

                settingsService.SaveSettingsConfig().then(function(){

                    const objectSecond = settingsService.GetSettings();

                    let checkLength = objectFirst.GetEmails().length == objectSecond.GetEmails().length;

                    checkLength.should.equal(true);

                    done();
                })
            })
            done();
        });
    });
}

module.exports = settingsServiceTest;