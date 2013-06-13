App.ContactEditController = Em.ObjectController.extend({
  needs: ['contact'],

  startEditing: function() {
    // add the contact and its associated phone numbers to a local transaction
    var contact = this.get('content');
    var transaction = contact.get('store').transaction();
    transaction.add(contact);
    contact.get('phoneNumbers').forEach(function(phoneNumber) {
      transaction.add(phoneNumber);
    });

    contact.get('stocks').forEach(function(stock) {
      transaction.add(stock);
    });
    this.transaction = transaction;

	console.log('startEditing') ;

  },

  stopEditing: function() {
    // rollback the local transaction if it hasn't already been cleared
    var transaction = this.transaction;
    if (transaction) {
      transaction.rollback();
      this.transaction = undefined;
    }

	console.log('stopEditing') ;

  },

  save: function() {
	stocks = this.get('content').get('stocks') ;
	stocks.forEach (function(stock) {
		stock.set('symbol', stock.get('symbol').toUpperCase() ) ;
	});
		
    this.transaction.commit();
    this.transaction = undefined;
    this.get('controllers.contact').stopEditing();

	flash_message('Contact was successfully updated.', 'success') ;	
	
	//	// check and remove any stock records created, but not persisted in server ( id: null ) 
	this.controllerFor('stocks').clean_up() ;
	
	
  	return this.transitionToRoute('contact', this.get('content') );

  },

  cancel: function() {
    this.get('controllers.contact').stopEditing();
  },

  addPhoneNumber: function() {
    this.get('content.phoneNumbers').createRecord();
  },

  removePhoneNumber: function(phoneNumber) {
    phoneNumber.deleteRecord();
  },

  addStock: function() {
    this.get('content.stocks').createRecord();
  },

  removeStock: function(stock) {
	console.log(stock) ;
    stock.deleteRecord();

  }
});
