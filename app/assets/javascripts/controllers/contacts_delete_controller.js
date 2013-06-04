App.ContactsDeleteController = Em.ObjectController.extend({

	destroyRecord: function() {
	    if (window.confirm("Are you sure you want to delete this contact?")) {
	      this.get('content').deleteRecord();
	      this.get('store').commit();

	      // return to the main contacts listing page
	      this.get('target.router').transitionTo('contacts.index');
	    }
  	},

	cancel: function() {
		return this.transitionToRoute('contact', this.content);
	}


});
