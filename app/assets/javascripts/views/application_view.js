App.ApplicationView = Em.View.extend({
	login_button_class: function(){ 
		var btn = 'btn btn-success'
		if ( App.logged_in_state ) {
		btn = 'btn'	
		}
	    return btn
	}.property('App.logged_in_state').cacheable()
	
});
