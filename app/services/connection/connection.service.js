
// --- connection factory that tests if app is connected to internet ---- //
function connectionFactoryModule(app){
    //needed modules
    const nodeDns = require("dns");

    function connectionFactory(){

        //returned factory
        const factory = {

        };

        let status = {
            connected : false
        }

        // -- privates -- //

        //returns object holding current status
        factory.GetStatus =()=>{
            return status;
        }

        //check for connection
        //default dns is nodeDns , injecting service
        factory.CheckConnection = () => {

            //returns promise if connected to internet
            const promise = new Promise(function(resolve,reject){

                //lookup for google
                 nodeDns.lookup("google.com",(err)=>{
                    //if there is error / cannot connect return false
                    if(err){
                        //set connected flag
                        status.connected = false;

                        resolve(false);
                    }
                    else{
                        //connection was successfull
                        //set connected flag
                        status.connected = true;

                        resolve(true);
                    }
                });

            });

            return promise;

        };
        //return factory
        return factory;
    }
    //registerfactory
    app.factory("connectionService",connectionFactory);

}


//export module
module.exports = connectionFactoryModule;