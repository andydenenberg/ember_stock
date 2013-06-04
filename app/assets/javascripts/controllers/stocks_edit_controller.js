
App.StocksEditController = Em.ObjectController.extend({
  needs: ['stock'],
  selectedContact: null,
  	
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
	var contact = stock.get('contact') ;
	
	updated_contact_id = contact.get('id') ;
	console.log('old:', contact_id, 'new:', updated_contact_id ) ;
	
	if (updated_contact_id != contact_id) { 
		this.store.commit();
		
		console.log( App.Stock.find().get('length') ) ;
		
	    NewStock = App.Stock.createRecord(stock_attr) ;	
		contact.get("stocks").pushObject(NewStock);
		this.store.commit();

		stocks = this.controllerFor('stocks').get('stocks');
		
		console.log( 'sotcks_length', stocks.get('length') ) ;

	}
	//	
	
	
//	contact = App.Contact.find(contact.id)
//	contact.get("stocks").pushObject(NewStock);
	
    this.store.commit();

//    var stocks = this.controllerFor('stocks').get('stocks');
//	console.log('Length' , stocks.get('length')) ;
//	stocks.forEach(function(stk) {
//      console.log(stk);
//    });
    

//    console.log('stock_saved');
//	  count = 	App.Stock.find().getEach('quantity').reduce(function(
//							previousValue, currentValue, index, array){
//		  							return Number(previousValue) + Number(currentValue)
//									});	
//	  App.set('total_quantity', count);

	$("#flash span").text("Stock successfully updated.")
	.show().parent().fadeIn()
	.delay(2000).fadeOut('slow', function() { 
	    $("#flash span").text('') 
	});

  return this.transitionToRoute('stock', this.content);

//	var stocks = App.Stock.find();
//	this.controllerFor('stocks').set('stocks', stocks);

//	return this.transitionToRoute('stocks');
  },



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
