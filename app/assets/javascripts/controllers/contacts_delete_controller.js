App.ContactsDeleteController = Em.ObjectController.extend({

	destroyRecord: function() {
	    if (window.confirm("Are you sure you want to delete this contact?")) {
	      this.get('content').deleteRecord();
	      this.get('store').commit();

		flash_message('Contact was successfully deleted.', 'success') ;	
		
	  	return this.transitionToRoute('contacts' );
	    }
  	},

	cancel: function() {
		return this.transitionToRoute('contact', this.content);
	}


});
