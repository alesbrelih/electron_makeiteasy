//exported module function
function registerComponents(app){

    // index page component
    const indexpage = require("./index-page/indexpage.component");
    indexpage(app);

}

module.exports = registerComponents;