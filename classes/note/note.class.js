

class Note{

    //constructor
    constructor(note){

        this.id = note.ID;
        this.description = note.DESCRIPTION;

    }
    //get id
    get Id(){
        return this.id;
    }
    //set get for description
    get Description(){
        return this.description;
    }
    set Description(_description){
        this.description = _description;
    }

}


//export class
module.exports = Note;