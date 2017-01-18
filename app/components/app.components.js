//exported module function
function registerComponents(app){

    // index page component
    const indexpage = require("./index-page/indexpage.component");
    indexpage(app);

    //settings page component
    const settings = require("./settings/settings.component");
    settings(app);

}

module.exports = registerComponents;