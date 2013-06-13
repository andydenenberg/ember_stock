App.ContactsEditRoute = Ember.Route.extend({
  setupController: function(controller, model) {

	this.controller.set('content', model ) ;

    // highlight this contact as active
    this.controllerFor('contacts').set('activeContactId', model.get('id'));
  },

  deactivate: function() {
    var controller = this.controllerFor('contact');

    // reset editing state
    if (controller.get('isEditing')) {
      controller.stopEditing();
    }

    // un-highlight the active contact (perhaps temporarily)
    this.controllerFor('contacts').set('activeContactId', null);
  }

});
