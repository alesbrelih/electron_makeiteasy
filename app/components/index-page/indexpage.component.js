//index page component function
function indexpageComponent(app){

    //controller
    function indexpageController(){

        //for referencing
        const vm = this;

    }


    app.component("abIndexPage",{

        templateUrl:"app/components/index-page/indexpage.component.html",
        controller:indexpageController,
        controllerAs:"vm"

    });

}

//export indexpage component function
module.exports = indexpageComponent;