/** Router **/
Notes.Router.map(function () {
    this.route('contact', {path: "/"});
    this.route('notes', {path: "/notes"});
	this.route("contact", { path: "/contacts" });
});

Notes.NotesRoute = Ember.Route.extend({
    setupController: function(controller) {
        controller.set('content', []);

		// set state for the application template to render the correct template ( notes or contact )
	 	this.controllerFor('application').set('note_state', true) ;
	
        var selectedNoteController = this.controllerFor('selectedNote');
        selectedNoteController.set('notesController', controller);
    }
});

Notes.ContactRoute = Ember.Route.extend({
  	setupController: function(controller) {
	 	var contacts = Notes.Contact.find() ;
     	controller.set('content', contacts);

		// set state for the application template to render the correct template ( notes or contact )
 		this.controllerFor('application').set('contact_state', true) ;
	
     	var selectedContactController = this.controllerFor('selectedContact');
     	selectedContactController.set('contactController', controller);

  }
});
