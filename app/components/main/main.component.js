
// -- main component module --- //

function mainComponentModule(app){

    function mainComponentController(connectionService,settingsService){
        //controller ref
        const vm = this;

        //on init set ref to status object
        vm.$onInit = ()=>{

            //status object ref
            vm.Status = connectionService.GetStatus();

        }

        // methods
        vm.openSettings = () =>{

            //opens settings tab
            settingsService.OpenSettingsWindow();

        }

    }

    //inject needed services
    mainComponentController.$inject = ["connectionService","settingsService"];


    //register component
    app.component("abMain",{
        controller:mainComponentController,
        controllerAs:"vm",
        templateUrl:"app/components/main/main.component.html"
    })
}


//export module
module.exports = mainComponentModule;