
App.StocksEditController = Em.ObjectController.extend({
  needs: ['stock','stocks'],
  selectedContact: null,
  contact_id: null,
  	
  contacts: function() {
	var contacts = App.Contact.find() ;
	contacts.forEach(function(contact) {
      contact.get('phoneNumbers') ;
    });	
    return contacts
  	}.property("contacts.@each").cacheable(),


  save: function() {	
	
	var stock = this.get('content')
	var stock_attr = stock.get('data.attributes') ;
	var contact = this.get('selectedContact') ;
	
	// check whether stock has moved from one contact to another		
	updated_contact_id = contact.get('id') ;	
	if (updated_contact_id != contact_id) { 
		stock.deleteRecord(); // delete old record		
		contact.get("stocks").createRecord(stock_attr) ;	
		console.log('contact_stocks', contact.get('stocks')) ;		
	}
	
    this.store.commit();

//	// check and remove any stock records created, but not persisted in server ( id: null ) 
	this.get('controllers.stocks').clean_up() ;
	
	flash_message('Stock successfully updated.', 'success') ;	
	
  	return this.transitionToRoute('stocks' );

  },

  transitionAfterSave: function() {
    // when creating new records, it's necessary to wait for the record to be assigned
    // an id before we can transition to its route (which depends on its id)
    if (this.get('content.id')) {
//      this.transitionToRoute('stocks');
    }
  }, //.observes('content.id'),


  cancel: function() {

    console.log('stock_saved');
	  count = 	App.Stock.find().getEach('quantity').reduce(function(
							previousValue, currentValue, index, array){
		  							return Number(previousValue) + Number(currentValue)
									});	
	  App.set('total_quantity', count);


//	return this.transitionToRoute('stocks', this.content);
	return this.transitionToRoute('stocks');
  }

});
