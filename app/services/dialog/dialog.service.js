
// --- dialog service module --- //

function dialogServiceModule(app){

    //dialog service controller
    function dialogServiceController($uibModal){

        //dialogFactory
        const dialogFactory = {};

        //open new dialog with action and element and callback function
        dialogFactory.Dialog = (selectedAction,selectedElement,cb) =>{


            const modalInstance = $uibModal.open({
                component: 'abDialog',
                resolve:{
                    action:()=>{
                        return selectedAction;
                    },
                    element:()=>{
                        return selectedElement;
                    }
                }
            });

            modalInstance.result.then(cb);

        }

        //return factory
        return dialogFactory;

    }

    //needed dependencies
    dialogServiceController.$inject = ["$uibModal"];


    //app
    app.factory("dialogService",dialogServiceController)
}

module.exports = dialogServiceModule;