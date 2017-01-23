
// _--- NEEDED MODULES ---- //

class CompletedNote{

    //class constructor takes object as param
    constructor(completedNote){
        this.id = completedNote.ID;
        this.description = completedNote.DESCRIPTION;

        //if date
        if(completedNote.DATE){
            this.date = completedNote.DATE;
        }

    }

    //get methods
    get Id(){
        return this.id;
    }
    get Description(){
        return this.description;
    }
    get Date(){
        return this.date;
    }

    //set methods
    set Id(_id){
        this.id = _id;
    }

    set Description(_description){
        this.description = _description;
    }

    set Date(_date){
        this.date = _date;
    }




}

//export class
module.exports = CompletedNote;