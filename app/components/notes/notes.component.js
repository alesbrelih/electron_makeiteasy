
// ---- notes component module ---- //

function notesComponentModule(app){

    //controller
    function notesComponentController(notesService){

        //ref to controller
        const vm = this;

        //on init
        vm.$onInit = ()=>{
            //all notes
            vm.Notes = notesService.Notes;

            //selected for edit/new var
            vm.selected = null;

        };


        // --- actions --- //

        //remove
        vm.removeNote = (id)=>{
            notesService.RemoveConfirm(id,true);
        };

        //complete
        vm.completeNote = (note) =>{
            notesService.CompleteConfirm(note,true);
        };

        //edit notes
        vm.editNote = () => {
            notesService.EditConfirm(vm.selected,true,()=>{
                vm.selected = null;
            })
        };

        //add note
        vm.addNote = () => {
            notesService.AddConfirm(vm.selected.Description,true,()=>{
                 vm.selected = null;
            })
        };

        //set selected to create / edit
        vm.setSelected = (note)=>{

            if(note){
                //note to edit was provided
                vm.selected = {
                    Id : note.Id,
                    Description: note.Description
                }

            }
            else{
                vm.selected = {
                    Description:""
                }
            }

        }

    }
    notesComponentController.$inject = ["notesService"];

    app.component("abNotes",{
        controller:notesComponentController,
        controllerAs:"vm",
        templateUrl:"app/components/notes/notes.component.html"
    })
}

module.exports = notesComponentModule;