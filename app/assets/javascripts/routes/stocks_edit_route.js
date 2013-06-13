App.StocksEditRoute = Ember.Route.extend({
	
  setupController: function(controller, model) {
//    this.controllerFor('stocks.edit').set('originalStock_attr', model.get('data.attributes'));

	controller.set('content', model ) ;
	
	contact_id = model.get('contact').get('id') 
    this.controllerFor('stocks.edit').set('contact_id', contact_id);

	this.controller.set('selectedContact', model.get('contact'));
    
	}

});
