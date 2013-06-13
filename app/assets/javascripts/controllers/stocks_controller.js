App.StocksController = Em.ArrayController.extend({
	
  clean_stocks: function() {
		console.log('in clean_stocks') ;
		return this.content.filterProperty('state', 'saved')
  }.property('content.@each'),

  activeStockId: null,
  content: null,

  display_list: function() {
		return (this.activeStockId === null) && (this.content.get('length') > 0) 
	}.property('activeStockId','content.@each'),

  sortProperties: ['contact.id'],
  sortAscending: true,

  activeStockId: null,
  selectedStock: null,
  
  total_value: function() {
	var total = 0 ;
		this.content.forEach(function(stock){
			total += stock.get('quantity') * stock.get('purchase_price') ;
	})		
	return total // Ember.inspect( this.count )
	}.property('content.@each.quantity','content.@each.purchase_price'), // 'contact.@each'),
	
	
  clean_up: function() {
	console.log('launching CleanUp') ;
		
	Ember.run.later(this, function() {	
		console.log('in Clean up') ;
		this.content.filterProperty('id', null).forEach(function(stock) {
			stock.deleteRecord() ;
		});
		this.store.commit();
	}, 1000);
	} //.observes('content.@each'),
	
	
});

