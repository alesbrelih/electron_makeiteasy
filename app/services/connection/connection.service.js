
// --- connection factory that tests if app is connected to internet ---- //
function connectionFactoryModule(app){
    //needed modules
    const nodeDns = require("dns");

    function connectionFactory($q){

        //returned factory
        const factory = {};

        // -- privates -- //


        //check for connection
        //default dns is nodeDns , injecting service
        factory.CheckConnection = () => {

            //returns promise if connected to internet
            const promise = new Promise(function(resolve,reject){

                //lookup for google
                 nodeDns.lookup("google.com",(err)=>{
                    //if there is error / cannot connect return false
                    if(err){
                        resolve(false);
                    }
                    else{
                        //connection was successfull
                        resolve(true);
                    }
                });

            });

            return promise;

        };
        //return factory
        return factory;
    }

    //inject promises
    connectionFactory.$inject=["$q"];

    //registerfactory
    app.factory("connectionService",connectionFactory);

}


//export module
module.exports = connectionFactoryModule;