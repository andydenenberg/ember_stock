App.ContactsController = Em.ArrayController.extend({
//  sortProperties: ['lastName', 'firstName'],
	activeContactId: null,
	content: null,
	
	display_list: function() {
		return (this.activeContactId === null) && (this.content.get('length') > 0) 
	}.property('activeContactId','content.@each'),
	
	  sortProperties: ['portfolio_value'],
	  sortAscending: true,
	  activeContactId: null,
	
  sort: function() {
	direction = this.get('sortAscending') ;
	if (direction == true) { this.set('sortAscending', false) ;	}
	else { this.set('sortAscending', true) ; };    
  },
  
  total_value: function() {
	var total = 0 ;
//	contacts.then(function(contacts){
		console.log('in total calc')
			this.content.forEach(function(contact){
				total += contact.get('portfolio_value') ;			
			});
//	});	
	return total // Ember.inspect( this.count )
	}.property('content.@each.portfolio_value'),

	
//	total = stocks.getEach('quantity').reduce(function(previousValue, currentValue, index, array){
//	  return Number(previousValue) + Number(currentValue);
//	});
//    return total
//  	}.property("stocks.@each").cacheable(),

});
