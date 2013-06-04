App.ContactsRoute = Ember.Route.extend({
  model: function() {
    return App.Contact.find();
  },

  setupController: function(controller, model) {
	controller.set('contacts', model )
//  moved this to a global variable...
//	count = App.Contact.find().get('length') ;	
//  this.controllerFor('contacts').set('count', count);

  }

});
