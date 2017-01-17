//index page component function
function indexpageComponent(app){

    //controller
    function indexpageController(connectionService){

        //for referencing
        const vm = this;

        //oninit
        vm.$onInit = ()=>{

            //connectedflag
            vm.Connected = connectionService.Connected;

            console.log(vm.Connected);

        };
    }

    //inject connection service
    indexpageController.$inject = ["connectionService"];


    app.component("abIndexPage",{

        templateUrl:"app/components/index-page/indexpage.component.html",
        controller:indexpageController,
        controllerAs:"vm"

    });

}

//export indexpage component function
module.exports = indexpageComponent;