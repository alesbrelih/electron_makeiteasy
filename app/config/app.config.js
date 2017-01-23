//////////////////////////////////
// ----- Configures App -------//
/////////////////////////////////

function appConfig(app){

    app.config(function($stateProvider){

        $stateProvider.state("home",{

            url:"/",
            template:"<ab-index-page></ab-index-page>",
            resolve:["connectionService",function(connectionService){
                return connectionService.CheckConnection();
            }]
        })
        .state("main",{
            abstract:true,
            template:"<ab-main></ab-main>"
        })
        .state("main.notes",{
            template:"<ab-notes></ab-notes>",
            resolve:{
                notes:["notesService",function(notesService){
                    return notesService.GetNotes();
                }]
            }
        });

    });


}

module.exports = appConfig;