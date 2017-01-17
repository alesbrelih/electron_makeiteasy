// -- angular refference -- //
const angular = require("angular");


//create app
const app = angular.module("mainWrapper",[require("angular-ui-router"),require("angular-animate"),require("angular-ui-bootstrap")]);

//configure app
require("./config/app.config")(app);

//register components
require("./components/app.components")(app);

//register services
require("./services/app.service")(app);

