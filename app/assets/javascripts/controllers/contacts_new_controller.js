App.ContactsNewController = Em.ObjectController.extend({

  startEditing: function() {
    // create a new record on a local transaction

    this.transaction = this.get('store').transaction();
    this.set('content', this.transaction.createRecord(App.Contact, {}));
  },

  stopEditing: function() {
    // rollback the local transaction if it hasn't already been cleared
    if (this.transaction) {
      this.transaction.rollback();
      this.transaction = null;
    }
  },

  save: function() {
	// uppercase the Stock Symbol
	stocks = this.get('content').get('stocks') ;
	stocks.forEach (function(stock) {
		stock.set('symbol', stock.get('symbol').toUpperCase() ) ;
	});
	
    // commit and then clear the local transaction
    this.transaction.commit();
    this.transaction = null;
    this.transitionToRoute('contacts');
  },

  transitionAfterSave: function() {
    // when creating new records, it's necessary to wait for the record to be assigned
    // an id before we can transition to its route (which depends on its id)
    if (this.get('content.id')) {
//      this.transitionToRoute('contact', this.get('content'));
    }
  }.observes('content.id'),

  cancel: function() {
    this.stopEditing();
    this.transitionToRoute('contacts.index');
  },

  addPhoneNumber: function() {
    this.get('content.phoneNumbers').createRecord();
  },

  removePhoneNumber: function(phoneNumber) {
    phoneNumber.deleteRecord();
  }	,

	  addStock: function() {
	    this.get('content.stocks').createRecord();
	  },

	  removeStock: function(stock) {
	    stock.deleteRecord();

	  }
});
