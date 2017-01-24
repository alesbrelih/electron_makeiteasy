
// ---- exported settings service module ---- //
function settingsServiceModule(app){

    //require file stream
    const fs = require("fs");

    //settings class
    const Settings = require("../../../classes/settings/settings.class");

    //settings controller
    function settingsController($uibModal){

        //returned singleton
        let settings = {};
        let settingsObject = null;

        // --- public ---- //

        //gets email accounts from json file
        settings.GetSettingsConfig = ()=>{

            //return promise
            const promise = new Promise(function(resolve,reject){
                fs.readFile("config/settings.json",function(err,data){
                    //err
                    if(err){

                        reject("Error accessing settings");
                    }

                    //get json
                    const settingsJson = JSON.parse(data);

                    //set settings object class
                    settingsObject = new Settings(settingsJson);

                    //resolve promise
                    resolve(settingsObject);
                })
            });

            //return promise
            return promise;
        };

        //save settings config
        settings.SaveSettingsConfig = ()=>{

            const promiseSave = new Promise(function(resolve,reject){

                const saved = {
                    emails:this.settingsObject.GetEmails()
                }

                //stringify object
                const stringifyed = JSON.stringify(saved);

                //write file
                fs.writeFile("config/settings.json", stringifyed, (err) => {
                    if (err) {
                        reject();
                    }
                   resolve("Successfully saved.");
                });
            })
        };

        //return settings object
        settings.GetSettings = ()=>{
            return settingsObject;
        };

        //open settings window
        settings.OpenSettingsWindow = () =>{
            var modalInstance = $uibModal.open({
            component: 'abSettings'
            });

            modalInstance.result.then(function () {
                this.SaveSettingsConfig();
            });
        };

        return settings;

    }
    settingsController.$inject = ["$uibModal"];


    //register service
    app.factory("settingsService",settingsController);

}

//export module
module.exports=settingsServiceModule;