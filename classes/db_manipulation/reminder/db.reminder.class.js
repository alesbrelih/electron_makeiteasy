
// needed modules

//reminder
const Reminder = require("../../reminder/reminder.class");

//base dbclass
const DbConn = require("../base/db.connection.class");

//sqlite
const sqlite = require("sqlite3");

class RemindersDb extends DbConn{

    //constructor is the same
    constructor(custompath,cb){
        super(custompath,cb);
    }

    //gets reminders from db
    getReminders(){

        const self = this;

        //create promise to return
        const promise = new Promise(function(resolve,reject){

            //db ref
            const db = new sqlite.Database(self.getDbPath());

            const sql = "SELECT * FROM REMINDER";

            //returned table
            const reminders = [];

            //db serialize
            db.serialize(()=>{

                //prepare statement
                const statement = db.prepare(sql);

                statement.each(function(err,row){
                    //for each for add new reminder to reminders
                    if(err){
                        reject(err);
                    }
                    else{

                        const reminderObj = new Reminder(row.MINUTE,row.HOUR);
                        reminderObj.setDaysFromString(row.DAYSOFWEEK);
                        reminderObj.Id = row.ID;
                        reminders.push(reminderObj);
                    }
                },function(err){
                    //return reminders
                    if(err){
                        reject(err);
                    }
                    else{
                        resolve(reminders);
                    }
                });

                //finalize
                statement.finalize();
            });

            //close db
            db.close();
        })

        //return promise
        return promise;
    }

    //add new reminder
    // hour, minute INTS
    // daysofweek ARRAY
    addReminder(reminderObj){

        //obj ref
        const self = this;

        //set reminder obj days array into string

        reminderObj.setDaysFromArray(reminderObj.DaysArray);

        const sql = "INSERT INTO REMINDER(ID,MINUTE,HOUR,DAYSOFWEEK) VALUES(?,?,?,?)";



        //db refference
        const db = new sqlite.Database(self.getDbPath());

        //create promise
        const promise = new Promise(function(resolve,reject){


            //serialize
             db.serialize(()=>{

            //statement
            const statement = db.prepare(sql);


            //exex
            statement.run([reminderObj.Id,reminderObj.Minute,reminderObj.Hour,reminderObj.Days],function(err){
                if(err){
                    reject(err);
                }
                else{

                    resolve();
                }

            })

            //finalize
            statement.finalize();

        });

        //close db when end
        db.close();

        });

        //Return promise
        return promise;
    }

    //get next id from db
    getNextId(){

        //obj ref
        const self = this;

        //sql statement
        const sql = "SELECT MAX(ID) FROM REMINDER";

        //create promise
        const promise = new Promise(function(resolve,reject){

            //db ref
            const db = new sqlite.Database(self.getDbPath());

            db.serialize(()=>{

                //prepare statement
                const statement = db.prepare(sql);

                statement.get((err,row)=>{
                    if(err){
                        reject(err);
                    }
                    else{
                        const id = row["MAX(ID)"]+1;
                        resolve(id);
                    }
                })

                //finalize
                statement.finalize();

            });

            //close connection
            db.close();


        });

        //return promise
        return promise;

    }

    //delete reminder
    removeReminder(reminderId){

        //object ref
        const self = this;

        //sql statement string
        const sql = "DELETE FROM REMINDER WHERE ID=?";

        //promise
        const promise = new Promise(function(resolve,reject){

            //db ref
            const db = new sqlite.Database(self.getDbPath());

            db.serialize(()=>{
                //statement
                const statement = db.prepare(sql);

                statement.run(reminderId,(err)=>{
                    if(err){
                        reject(err);
                    }
                    else{
                        resolve();
                    }
                })

                statement.finalize();
            })
            //close db connection
            db.close();
        });
        //return promise
        return promise;
    }

    //edit reminder
    editReminder(reminderObj){

        //object ref
        const self = this;

        //sql string
        const sql = "UPDATE REMINDER SET HOUR=?, MINUTE=?, DAYSOFWEEK=? WHERE ID=?";

        //Set days string
        reminderObj.setDaysFromArray(reminderObj.DaysArray);

        //create promise
        const promise = new Promise(function(resolve,reject){

            //db ref
            const db = new sqlite.Database(self.getDbPath());

            db.serialize(()=>{

                //Statement
                const statement = db.prepare(sql);

                //exec
                statement.run([reminderObj.Hour,reminderObj.Minute,reminderObj.Days,reminderObj.Id],function(err){
                    if(err){
                        reject(err);
                    }
                    else{
                        resolve();
                    }
                })

                //finalize
                statement.finalize();

            });
            //close db connection
            db.close();
        });

        //return promise;
        return promise;
    }
}

//export module
module.exports = RemindersDb;