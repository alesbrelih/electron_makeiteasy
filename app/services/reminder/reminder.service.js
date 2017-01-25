// ---- reminder SERVICE ANGULAR MODULE --- //
function reminderServiceModule(app){

    //require cronmanager
    const cronManager = require("../../../cron_manager/cron.manager").getInstance();

    //controller for service
    function reminderController(){

        //return factory
        return cronManager;

    }

    //register service
    app.service("reminderService",reminderController);
}

module.exports = reminderServiceModule;