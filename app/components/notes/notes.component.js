

// ---- notes component module ---- //

function notesComponentModule(app){


    const config = require("../../../config/config");

    //controller
    function notesComponentController(notesService,completedNotesService){

        //ref to controller
        const vm = this;

        //on init
        vm.$onInit = ()=>{
            //all notes
            vm.Notes = notesService.Notes;

            //completed notes
            vm.CompletedNotes = completedNotesService.Notes;

            //selected for edit/new var
            vm.selected = null;

            //currently display active
            vm.display = "active";

            //set displayed limit
            vm.pageSize = config.notesPageSize;

            vm.maxPagesCompleted = vm.CompletedNotes.length/vm.pageSize;

            vm.changePage();



        };



        vm.changePage = ()=>{
            
            if(!vm.currentPage){
                vm.currentPage = 1;
            }

            const index = (vm.currentPage-1)*vm.pageSize;

            vm.CompletedNotesVisible = vm.CompletedNotes.slice(index,index+vm.pageSize);

        }

        // --- actions --- //

        //remove
        vm.removeNote = (id)=>{
            notesService.RemoveConfirm(id,true);
        };

        //complete
        vm.completeNote = (note) =>{
            notesService.CompleteConfirm(note,true,vm.changePage);
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
    notesComponentController.$inject = ["notesService","completedNotesService"];

    app.component("abNotes",{
        controller:notesComponentController,
        controllerAs:"vm",
        templateUrl:"app/components/notes/notes.component.html"
    })
}

module.exports = notesComponentModule;