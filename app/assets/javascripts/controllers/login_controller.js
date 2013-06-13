
// Create the login controller
App.LoginController = Ember.ObjectController.extend({
	username: '',
    password: '',
	
	contact: function() {
		var contact = this.content.filterProperty('email', this.username).get('firstObject') ;		
		return contact
	}.property('content'),

	warning: null,
  
    Logout: function() {
      App.set('logged_in_state', false) ;
    },
      
    Login: function() {
      // Normally this would go to the server. Simulate that.
      if(this.get('username') === App.USERNAME &&
         this.get('password') === App.PASSWORD) {
        App.set('logged_in_state', true) ;
		App.set('logged_in_user', this.get('username') );
		
		// clear fields for next login
//        this.set('username', '');
//        this.set('password', '');

//		this.transitionToRoute('contacts.index');

      } else {	
		flash_message('Error: Invalid username or password.', 'info') ;	
        App.set('logged_in_state', false) ;
      }

    }
});    
