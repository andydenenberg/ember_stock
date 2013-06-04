App.StocksController = Em.ArrayController.extend({
  activeStockId: null,
  selectedStock: null,
  
  portfolio_value: function() {
	
	

	return this.get('content').get('length') ;
}.property()

});

