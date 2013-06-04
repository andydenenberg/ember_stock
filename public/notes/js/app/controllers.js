/** Controllers **/
Notes.ApplicationController = Ember.Controller.extend({
	contact_state: false,
	note_state: false
});

// Need to specify that it is an Array Controller
Notes.ContactController  = Em.ArrayController.extend({
	selected: null,
	createNewContact: function() {
        var content = this.get('content');
        var newContactfirstName = this.get('newContactfirstName');
        var newContactlastName = this.get('newContactlastName');
        var newContactEmail = this.get('newContactEmail');
		var alertMsg = '' ;
		// check for filled out fields
        if ( newContactfirstName == null || newContactfirstName == null || newContactEmail.length < 1 ) {
		alertMsg = "Must have first and last names as well as email\n\n"
		}
		// check for unique email
        content.forEach(function(contact) {
            if (newContactEmail === contact.get('email')) {
				alertMsg += "Email must be unique\n"
                unique = false; return;
            }
        });

        if (alertMsg == '') {

		// create a new record on a local transaction
		this.transaction = this.get('store').transaction();
		this.transaction.createRecord(Notes.Contact, {
			"email": newContactEmail,
		    "firstName": newContactfirstName,
		    "lastName": newContactlastName
		} );
		// commit and then clear the local transaction
		this.transaction.commit();
		this.transaction = null;

		this.set('newContactfirstName', null);
		this.set('newContactlastName', null);
		this.set('newContactEmail', null);
		
        } else {
            alert(alertMsg);
        }
	// hide the modal create dialog
	$("#createContactDialog").modal('hide');
    },

	    doDeleteContact: function() {
	        $("#confirmDeleteConfirmDialog").modal({show: true});
	    },
    
	    doConfirmDelete: function() {
	        var selectedContact = this.get('selected');
	        if (selectedContact) {
		      selectedContact.deleteRecord();
		      this.get('store').commit();
	            this.set('selectedNote', null);
	        }
	        $("#confirmDeleteConfirmDialog").modal('hide');
	    },

	    doCancelDelete: function() {
	        $("#confirmDeleteConfirmDialog").modal('hide');
	    },
	
		doCreateContact: function() {
	        $("#createContactDialog").modal({show: true});
	    },
	    doCancelCreate: function() {
	        $("#createContactDialog").modal('hide');
	    },
	
});

Notes.NotesController = Ember.ArrayController.extend({
    content: [],
    newNoteName: null,

    createNewNote: function() {
        var content = this.get('content');
        var newNoteName = this.get('newNoteName');
        var unique = newNoteName != null && newNoteName.length > 1;
        content.forEach(function(note) {
            if (newNoteName === note.get('name')) {
                unique = false; return;
            }
        });

        if (unique) {
            content.pushObject(
                Ember.Object.create({"name": newNoteName, "value": ""})
            );
            this.set('newNoteName', null);
        } else {
            alert('Note must have a unique name of at least 2 characters!');
        }
    },

    doDeleteNote: function() {
        $("#confirmDeleteConfirmDialog").modal({show: true});
    },

    doConfirmDelete: function() {
        var selectedNote = this.get('selectedNote');
        if (selectedNote) {
            this.get('content').removeObject(selectedNote);
            this.set('selectedNote', null);
        }
        $("#confirmDeleteConfirmDialog").modal('hide');
    },

    doCancelDelete: function() {
        $("#confirmDeleteConfirmDialog").modal('hide');
    }
});

Notes.SelectedNoteController = Ember.ObjectController.extend({
    contentBinding: 'notesController.selectedNote',
    notesController: null
});

Notes.SelectedContactController = Ember.ObjectController.extend({
    contentBinding: 'contactController.selected',
	contactController: null,

	total_cost: function() {
		var stocks = this.get('stocks') ;
		cost = 0 ;
		stocks.forEach(function(object){
			cost += object.get('quantity') * object.get('purchase_price') ;
			});
		return numberWithCommas(cost.toFixed(2))
		}.property("stocks.@each").cacheable(),  
  
});
