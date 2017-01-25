// --- needed modules --- //
//config
const config = require("../config/config");

//reminders db
const RemindersDb = require("../classes/db_manipulation/reminder/db.reminder.class");

//cronjob holder object
const CronHolder = require("../classes/cron_holder/cron.holder.class");


//cronjob
const CronJob = require("cron").CronJob;

//returned singleton
const cronManager = ((function () {

    // Instance stores a reference to the Singleton
    var instance;

    function init() {

        // -- privates -- //

        //reminders array
        let cronHolders;

        //db class
        let db = new RemindersDb(config.dbpath, null);

        //creates cron job object
        function createCronJobObject(reminder){
            try{
                const cronOptions = {
                    cronTime: reminder.getCronTimeString(),
                    onTick: ()=>{
                        /*
                        * Runs every weekday (Monday through Friday)
                        * at 11:30:00 AM. It does not run on Saturday
                        * or Sunday.
                        */
                        //TODO: ON TICK FUNCTION
                        console.log("TEST");
                    },
                    start: false
                };

                //create crop object
                const cronReminder = new CronJob(cronOptions);

                return cronReminder;

            }
            catch(err){
                throw new Error(err);
            }

        }

        //get index of selected reminderId
        function getIndexOfReminder(reminderid){

            for(let index = 0; index<cronHolders.length; index++){

                if(cronHolders[index].Reminder.Id === reminderid){
                    return index;
                }
            }
            return -1;
        }


        // -- public -- //
        const cronSingleton = {

            // Public methods and variables

            //reminders array
            CronHolders: ()=>{
                return cronHolders;
            },

            //sets new db path
            SetPath: (customPath, cb) => {
                db = new RemindersDb(customPath, cb);
            },

            // --- METHODS FOR REMINDERS AS A GROUP --- //

            //get reminders
            //gets reminders
            //refresh is bool that indicates if public array should be refreshed
            GetReminders: () => {

                //reinit reminders
                cronHolders = [];

                //create promise
                const promise = new Promise((resolve, reject) => {

                    db.getReminders()
                        .then((remindersDb) => {

                            //set array
                            for(let reminder of remindersDb){
                                let cronHolder = new CronHolder();
                                cronHolder.Reminder = reminder;
                            }

                            //resolve promise
                            resolve(remindersDb);

                        }, (err) => {
                            reject(err);
                        });

                });

                //return promise
                return promise;

            },

            //sets reminder
            SetCronJobs: () => {

                //promise
                const promise = new Promise((resolve,reject)=>{

                    //foreach of db reminders
                    for (let cronHolder of cronHolders) {

                        try{
                            //create crop object
                            const cronReminder = createCronJobObject(cronHolder.Reminder);

                            //push to array of cronReminders
                            cronHolder.CronJob = cronReminder;
                        }
                        catch(err){
                            //if err when creating cron job
                            reject(err);
                            break;
                        }
                    }
                    resolve();
                });
                //return promise
                return promise;
            },

            //run reminders
            RunCronJobs:() => {

                //return promise
                const promise = new Promise((resolve,reject)=>{
                    for(let cronHolder of cronHolders){
                        try{
                            cronHolder.CronJob.start();
                        }
                        catch(err){
                            reject(err);
                            break;
                        }

                    }
                    resolve();
                });

                return promise;
            },

            //stop reminders
            StopCronJobs:()=>{
                //return promise
                const promise = new Promise((resolve,reject)=>{
                    for(let cronholder of cronHolders){
                        try{
                            cronholder.CronJob.stop();
                        }
                        catch(err){
                            reject(err);
                            break;
                        }

                    }
                    resolve();
                });
                return promise;
            },

            //gets reminders from db,
            //sets reminder jobs
            //start reminders
            InitializeCronJobs:()=>{

                //Create promise
                const promise = new Promise((resolve,reject)=>{

                    cronSingleton.GetReminders()
                        .then(()=>{
                            cronSingleton.SetCronJobs()
                                .then(()=>{
                                    cronSingleton.RunCronJobs()
                                        .then(()=>{
                                            resolve();
                                        })
                                })
                        })
                        .catch((err)=>{
                            reject(err);
                        })

                });
                //return promise
                return promise;
            },

            // --- METHODS FOR REMINDER AS A SINGLE UNIT --- //

            //add cronjob
            AddCronJob:(reminder)=>{

                //create promise
                const promise = new Promise((resolve,reject)=>{
                    db.getNextId()
                        .then(function(id){
                            reminder.Id = id;
                            db.addReminder(reminder)
                                .then(function(){
                                    try{
                                        //Create cronholder
                                        let cronHolder = new CronHolder();
                                        cronHolder.Reminder = reminder;
                                        cronHolder.CronJob = createCronJobObject(reminder);
                                        cronHolder.CronJob.start();
                                        //add cron holder to cronHolders
                                        cronHolders.push(cronHolder);
                                        resolve();
                                    }
                                    catch(err){
                                        reject(err);
                                    }
                                })
                        })
                        .catch((err)=>{
                            reject(err);
                        });
                });
                return promise;
            },

            //remove cronjob using reminder db id
            RemoveCronJob:(reminderId)=>{

                //create promise
                const promise = new Promise((resolve,reject)=>{

                    //get index of it
                    const index = getIndexOfReminder(reminderId);

                    //object representing it
                    let cronHolder = cronHolders[index];

                    //console.log(index,cronHolder);


                    if(cronHolder.CronJob.running === true){
                        //try to stop the job
                        try{

                            cronHolder.CronJob.stop();
                            //remove reminder from db
                            db.removeReminder(reminderId)
                                .then(()=>{
                                    //remove from current cronHolders
                                    cronHolders.splice(index,1);
                                    resolve();
                                },(err)=>{
                                    reject(err);
                                });
                        }
                        catch(err){
                            reject(err);
                        }
                    }
                    else{
                        db.removeReminder(reminderId)
                            .then(()=>{
                                //remove from current cronHolders

                                cronHolders.splice(index,1);
                                resolve();
                            },(err)=>{
                                reject(err);
                            });
                    }
                });
                //return promise
                return promise;

            },

            //edit cronjob
            EditCronJob:(cronHolder_) => {

                //create promise
                const promise = new Promise((resolve,reject)=>{

                    //if running stop it
                    if(cronHolder_.CronJob.running){
                        cronHolder_.CronJob.stop();
                    }

                    //edit in db
                    db.editReminder(cronHolder_.Reminder)
                        .then(()=>{

                            //recreate cronJob and start it
                            try{
                                cronHolder_.CronJob = createCronJobObject(cronHolder_.Reminder);
                                cronHolder_.CronJob.start();
                                resolve();
                        }
                            catch(err){
                                reject(err);
                            }
                        },(err)=>{
                            reject(err);
                        })
                });

                //return promise
                return promise;

            }

        };

        return cronSingleton;
    }

    return {

        // Get the Singleton instance if one exists
        // or create one if it doesn't
        getInstance:()=>{

            if (!instance) {
                instance = init();
            }
            return instance;
        }

    };

})());

//export singleton
module.exports = cronManager;