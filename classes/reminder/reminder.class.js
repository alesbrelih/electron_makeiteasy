
// -- Reminder class definition -- //

class Reminder{

    constructor(minutes,hour,daysofweek){
        //minute - int (0-59)
        //hour - int (0-23)
        //dayofweek - string - cron specific

        this.Hour = hour;
        this.Minutes = minutes;
        this.Days = daysofweek;


    }

    // --- getters --- //

    get Hour(){
        return this.hour;
    }
    get Minutes(){
        return this.minutes;
    }
    get Days(){
        return this.daysofweek;
    }

    // --- setters --- //
    set Hour(hour_){
        if(hour_ >= 0 && hour_<24){
            this.hour = hour_;
        }
        else{
            throw new Error("Hour is not in a valid format.")
        }

    }

    set Minutes(minutes_){
        if(minutes_ >= 0 && minutes_< 60){
            this.minutes = minutes_;
        }
        else{
            throw new Error("Minutes are not in a valid format.");
        }

    }
    set Days(daysofweek_){
        if(daysofweek_.match(/.[[0-6]|[,-]]/)){
            this.daysofweek = daysofweek_;
        }
        else{
            throw new Error("Days of week is not in correct format");
        }
    }

}

//export reminder class
module.exports = Reminder;