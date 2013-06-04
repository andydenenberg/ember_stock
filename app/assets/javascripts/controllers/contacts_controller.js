App.ContactsController = Em.ArrayController.extend({
//  sortProperties: ['lastName', 'firstName'],
  sortProperties: ['portfolio_value'],
  sortAscending: true,
  activeContactId: null,
	
  sort: function() {
	direction = this.get('sortAscending') ;
	if (direction == true) { this.set('sortAscending', false) ;	}
	else { this.set('sortAscending', true) ; };    
  },
  
  contacts: null,
  count: null,

  total_value: function() {
	contacts = this.contacts
	contacts.forEach(function(contact){
		console.log('contact', contact) ;
		});
	
	console.log('contacts',contacts) ;
	return this.contacts // Ember.inspect( this.count )
}.property(),


	
//	total = stocks.getEach('quantity').reduce(function(previousValue, currentValue, index, array){
//	  return Number(previousValue) + Number(currentValue);
//	});
//    return total
//  	}.property("stocks.@each").cacheable(),

});
