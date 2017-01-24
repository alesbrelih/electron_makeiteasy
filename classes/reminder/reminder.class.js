
// -- Reminder class definition -- //

class Reminder{

    constructor(minute,hour){
        //minute - int (0-59)
        //hour - int (0-23)
        this.id = -1;
        this.hour = hour;
        this.minute = minute;
        this.daysofweekArray = [];
        this.daysofweek = "";

    }

    // --- getters --- //

    get Id(){
        return this.id;
    }

    get Hour(){
        return this.hour;
    }
    get Minute(){
        return this.minute;
    }
    get Days(){
        return this.daysofweek;
    }
    get DaysArray(){
        return this.daysofweekArray;
    }

    // --- setters --- //
    set Id(id_){
        this.id = id_;
    }
    set Hour(hour_){
        if(hour_ >= 0 && hour_<24){
            this.hour = hour_;
        }
        else{
            throw new Error("Hour is not in a valid format.")
        }

    }

    set Minute(minute_){
        if(minute_ >= 0 && minute_< 60){
            this.minute = minute_;
        }
        else{
            throw new Error("Minutes are not in a valid format.");
        }

    }

    set DaysArray(daysarray_){
        this.daysofweekArray = daysarray_;
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
                    daysString += `,${dayInt.toString()}`;
                }
            }

        }
        //save string
        this.daysofweek = daysString;

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