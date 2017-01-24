
// -- Reminder class definition -- //

class Reminder{

    constructor(minutes,hour){
        //minute - int (0-59)
        //hour - int (0-23)

        this.Hour = hour;
        this.Minutes = minutes;

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
    get DaysArray(){
        return this.daysofweekArray;
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

    //set days from array
    setDaysFromArray(daysArray_){
        //transform array to string value aswell (for db value)
        let daysString = "";
        for(let dayInt of daysArray_){
            //check for invalid int
            if(dayInt<0 || dayInt>6){
                throw new Error("Day integer isnt valid!");
            }
            else{
                if(daysString.trim().length === 0){
                    daysString += dayInt.toString();
                }
                else{
                    daysString += `, ${dayInt.toString()}`;
                }
            }

        }

        //save both

        //save string
        this.daysofweek = daysString;

        //save array
        this.daysofweekArray = daysArray_;
    }

    //set days from string
    setDaysFromString(daysStr_){

        //check if there are any invalid chars in the string
        const invalidchars = daysStr_.match(/[^0-6,]/g);

        if(invalidchars === null){
            this.daysofweek = daysStr_;
            //TODO: IMPLEMENT FOR - IF NEEDED
            this.daysofweekArray = daysStr_.trim().split(",");
        }
        else{
            throw new Error("Days of week is not in correct format");
        }
    }

}

//export reminder class
module.exports = Reminder;