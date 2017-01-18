//index page component function
function indexpageComponent(app){

    //controller
    function indexpageController(connectionService,settingsService){

        //for referencing
        const vm = this;

        //oninit
        vm.$onInit = ()=>{

            //connectedflag
            vm.Connected = connectionService.Connected;

        };

        vm.OpenSettingsWindow = ()=>{
            settingsService.OpenSettingsWindow();
        }


    }

    //inject connection service
    indexpageController.$inject = ["connectionService","settingsService"];


    app.component("abIndexPage",{

        templateUrl:"app/components/index-page/indexpage.component.html",
        controller:indexpageController,
        controllerAs:"vm"

    });

}

//export indexpage component function
module.exports = indexpageComponent;