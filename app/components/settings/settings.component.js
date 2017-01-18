///////////////////////////////////////////
// ----- Settings Component Module ----- //
///////////////////////////////////////////

function settingsComponentModule(app){

    function settingsController(settingsService){
        //reference controller
        const vm = this;

        //on init
        vm.$onInit = ()=>{

            //get settings
            vm.settings = settingsService.GetSettings();

        }
        //save new settings
        vm.saveSettings = ()=>{
            settingsService.SaveSettingsConfig();
        }

        //dismiss modal
        vm.dismissModal = ()=>{
            vm.modalInstance.dismiss();
        }
    }
    //inject dependendies
    settingsController.$inject = ["settingsService"];

    //register component
    app.component("abSettings",{
        templateUrl:"app/components/settings/settings.component.html",
        controller:settingsController,
        controllerAs:"vm",
        bindings:{
            modalInstance:"<"
        }
    });

}

module.exports = settingsComponentModule;