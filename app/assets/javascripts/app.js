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
	current_path: null,
	logged_in_state: false,
	logged_in_user: ''
	});

// Expect creditionals
App.USERNAME = "test@example.com";
App.PASSWORD = "xxx";

function flash_message(message,severity) {
	$("#flash").attr("class","alert alert-" + severity);			
	$("#flash span").text(message)
	.show().parent().fadeIn()
	.delay(2000).fadeOut('slow', function() { 
	    $("#flash span").text('') 
	});	
};

// Defer App readiness until it should be advanced for either
// testing or production.
App.deferReadiness();
