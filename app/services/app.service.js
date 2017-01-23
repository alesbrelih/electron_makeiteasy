//module that registers all services in app
function registerAllServicesModule(app){

    //register connection service
    require("./connection/connection.service")(app);

    //register settings service
    require("./settings/settings.service")(app);

    //register notes service
    require("./notes/notes.service")(app);

    //completed notes service
    require("./notes/completed.notes.service")(app);

    //register dialog service
    require("./dialog/dialog.service")(app);
}

//export module that register all services
module.exports = registerAllServicesModule;