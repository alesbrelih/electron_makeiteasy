//////////////////////////////////
// ----- Configures App -------//
/////////////////////////////////

function appConfig(app){

    app.config(function($stateProvider,$urlRouterProvider){

        $stateProvider.state("home",{

            url:"/",
            template:"<ab-index-page></ab-index-page>",
            resolve:["connectionService",function(connectionService){
                return connectionService.CheckConnection();
            }]

        });

        $urlRouterProvider.otherwise("/");

    });


}

module.exports = appConfig;