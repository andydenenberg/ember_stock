App.StocksNewController = Em.ObjectController.extend({
  selectedContact: null,
  contacts: function() {
	var contacts = App.Contact.find() ;
	contacts.forEach(function(contact) {
      contact.get('phoneNumbers') ;
    });	
    return contacts
  	}.property("contacts.@each").cacheable(),
	
  startEditing: function() {
    // create a new record on a local transaction

    this.transaction = this.get('store').transaction();
    this.set('content', this.transaction.createRecord(App.Stock, {}));
	var contact = App.Contact.find().filterProperty('email', 'andydenenberg@gmail.com').get('firstObject') ;
	this.set('selectedContact', contact );

	console.log(Ember.inspect(this.get('content').get('contact') ) ) ;
  },

  stopEditing: function() {
    // rollback the local transaction if it hasn't already been cleared
    if (this.transaction) {
      this.transaction.rollback();
      this.transaction = null;
    }
  },

  save: function() {
    // commit and then clear the local transaction
	this.get('content').set('contact', this.get('selectedContact') ) ;
    this.transaction.commit();
    this.transaction = null;

// check and remove any stock records created, but not persisted in server ( id: null ) 
	this.controllerFor('stocks').clean_up() ;

	this.transitionToRoute('stocks.index');
    

//    console.log('stock_saved');
//	  count = 	App.Stock.find().getEach('quantity').reduce(function(
//							previousValue, currentValue, index, array){
//		  							return Number(previousValue) + Number(currentValue)
//									});	
//	  App.set('total_quantity', count);

  },

//  transitionAfterSave: function() {
	
//	     $("#flash span").text("Stock successfully created.")
//         .show().parent().fadeIn()
//         .delay(2000).fadeOut('slow', function() { 
//             $("#flash span").text('') 
//         });

	
    // when creating new records, it's necessary to wait for the record to be assigned
    // an id before we can transition to its route (which depends on its id)
//    if (this.get('content.id')) {
//      this.transitionToRoute('stock', this.get('content'));
//    }
//  }.observes('content.id'),

  cancel: function() {
    this.stopEditing();
    this.transitionToRoute('stocks.index');
  },

  addPhoneNumber: function() {
    this.get('content.phoneNumbers').createRecord();
  },

  removePhoneNumber: function(phoneNumber) {
    phoneNumber.deleteRecord();
  }
});
