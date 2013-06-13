App.ContactsRoute = Ember.Route.extend({

  redirect: function() {
	if (!App.get('logged_in_state')) {
		flash_message('You must first login to access Contacts.', 'warning') ;	
		this.transitionTo('login');		
	}
  },

  model: function() {
    // request all contacts from adapter
	var contacts = App.Contact.find();
    return contacts

    // filter contacts to exclude new ones
//    return App.Contact.filter(function(contact) {
//      return !contact.get('isNew');
//    });
  },

  setupController: function(controller, model) {
//	controller.set('contacts', model ) ;

	controller.set('model', model ) ;

//  moved this to a global variable...
//	count = App.Contact.find().get('length') ;	
//  this.controllerFor('contacts').set('count', count);

  }

});
