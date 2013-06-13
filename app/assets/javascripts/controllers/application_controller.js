
App.ApplicationController = Ember.ObjectController.extend({
	  currentPathDidChange: function() {
	    path = this.get('currentPath');
		App.set('current_path', path) ;
	  }.observes('currentPath'),

    Logout: function() {
      App.set('logged_in_state', false) ;
	  this.transitionToRoute('login');
    }
      
});    
