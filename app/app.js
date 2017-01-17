// -- angular refference -- //
const angular = require("angular");

//create app
const app = angular.module("mainWrapper",[]);

//configure app
//require("./config/app.config")(app);

//register components
require("./components/app.components")(app);

