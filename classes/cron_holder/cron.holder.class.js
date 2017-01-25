
// -- cron holder object -- //

class CronHolder{

    constructor(){
        this.reminderObj = null;
        this.cronjobObj = null;
    }

    // -- getters -- //
    get Reminder(){
        return this.reminderObj;
    }
    get CronJob(){
        return this.cronjobObj;
    }

    // -- setters -- //
    set Reminder(reminder_){
        this.reminderObj = reminder_;
    }
    set CronJob(cronjob_){
        this.cronjobObj = cronjob_;
    }

}

module.exports = CronHolder;