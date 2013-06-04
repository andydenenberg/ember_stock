App.ContactsEditController = Em.ObjectController.extend({
  needs: ['contact'],

  save: function() {
	// uppercase the Stock Symbol
	stocks = this.get('content').get('stocks') ;
	stocks.forEach (function(stock) {
		stock.set('symbol', stock.get('symbol').toUpperCase() ) ;
	});

	$("#flash span").text("Contact successfully updated.")
	.show().parent().fadeIn()
	.delay(2000).fadeOut('slow', function() { 
	    $("#flash span").text('') 
	});

	console.log('store:', this.store) ;
    this.store.commit();
	return this.transitionToRoute('contact', this.content);
  },

  cancel: function() {
	this.controllerFor('contacts').set('activeContactId', null);
	return this.transitionToRoute('contacts');
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
    stock.deleteRecord();
  }


});
