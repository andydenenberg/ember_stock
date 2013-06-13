App.LoginRoute = Ember.Route.extend({
  setupController: function(controller, model) {
	
	this.controller.set('model', App.Contact.find() ) ;
	this.controller.set('username', 'test@example.com') ;
	this.controller.set('password', 'xxx') ;
	}
//	renderTemplate: function() {
//	this.render('login')
//	  },
});
