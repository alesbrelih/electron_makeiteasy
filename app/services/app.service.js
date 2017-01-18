//module that registers all services in app
function registerAllServicesModule(app){

    //register connection service
    require("./connection/connection.service")(app);

    //register settings service
    require("./settings/settings.service")(app);
}

//export module that register all services
module.exports = registerAllServicesModule;