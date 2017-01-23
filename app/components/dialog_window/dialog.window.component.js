
// --- Dialog window component module --- //

function dialogWindowComponentModule(app){

    //dialog controller
    function dialogController(){
        //conroller ref
        const vm = this;

        //on init
        vm.$onInit = ()=>{

            //get action
            const action = vm.resolve.action;
            const element = vm.resolve.element;

            //set title and message
            vm.title = `Confirm ${action}`
            vm.message = `Do you want to ${action} this ${element} ?`;

        };

        // public actions
        vm.AcceptModal = ()=>{
            vm.modalInstance.close();
        };

        vm.DeclineModal = ()=>{
            vm.modalInstance.dismiss();
        };
    }


    //register dialog
    app.component("abDialog",{
        controller:dialogController,
        controllerAs:"vm",
        templateUrl:"app/components/dialog_window/dialog.window.component.html",
        bindings:{
            modalInstance:"<",
            resolve:"<"
        }
    });

}

module.exports = dialogWindowComponentModule;