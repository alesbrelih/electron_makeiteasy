//wrapper that calls all the tests

// ----------- required modules -------- //
const angular = require("angular");
require("angular-mocks");
require("../app/app")
// ------------------------------------- //


// TESTS FOR SERVICES //

require("./services/services.test")(angular);


// TEST FOR STATES
require("./states/states.test")(angular);