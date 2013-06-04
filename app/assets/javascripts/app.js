//= require_self
//= require ./store
//= require_tree ./models
//= require_tree ./controllers
//= require_tree ./views
//= require_tree ./helpers
//= require_tree ./templates
//= require ./router
//= require_tree ./routes

App = Em.Application.create({
	LOG_TRANSITIONS: true,
	current_path: null
	});

App.ApplicationController = Ember.Controller.extend({
  currentPathDidChange: function() {
    path = this.get('currentPath');
	App.set('current_path', path) ;
  }.observes('currentPath')
});

//ready = 	function() {
//			count = App.Contact.find().get('length') ;	
//			alert(count) ;
//		    App.set('contact_count', count);
		
//	  console.dir(App.Contact.find().get('length'));
//	};
	
//	App.ready = function() {
//		App.Contact.find().then(function(contacts) {console.log(contacts.content.length)})
//			ready();
//	};
	


//App.addObserver("isLoaded", alert('sdfdsf'));

// Defer App readiness until it should be advanced for either
// testing or production.
App.deferReadiness();

function numberWithCommas(n) {
    var parts=n.toString().split(".");
    return parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",") + (parts[1] ? "." + parts[1] : "");
}
	
