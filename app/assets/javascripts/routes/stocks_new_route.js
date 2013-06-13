App.StocksNewRoute = Ember.Route.extend({
  redirect: function() {
	contacts = this.controllerFor('contacts').get('model')
	if (contacts.get('length') < 1 ) {
		alert('You must have at least one Contact.') ;	
		this.transitionTo('contacts');		
	}
  },	
	
  model: function() {
    // Because we are maintaining a transaction locally in the controller for editing,
    // the new record needs to be created in the controller.
    return null;
  },

  setupController: function(controller) {
    controller.startEditing();
  },

  deactivate: function() {
    this.controllerFor('stocks.new').stopEditing();
  }
});
