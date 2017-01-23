//exported module function
function registerComponents(app){

    // index page component
    const indexpage = require("./index-page/indexpage.component");
    indexpage(app);

    //settings page component
    const settings = require("./settings/settings.component");
    settings(app);

    //main app wrapper component
    const main = require("./main/main.component");
    main(app);

    //notes component
    const notes = require("./notes/notes.component");
    notes(app);

    //dialog window
    const dialogWindow = require("./dialog_window/dialog.window.component");
    dialogWindow(app);
}

module.exports = registerComponents;