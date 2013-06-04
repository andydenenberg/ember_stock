App.StockController = Em.ObjectController.extend({

  total_shares: function() {
	var stocks = App.Stock.find() ;
	total = stocks.getEach('quantity').reduce(function(previousValue, currentValue, index, array){
	  return Number(previousValue) + Number(currentValue);
	});
    return total
  	}.property("stocks.@each").cacheable(),

	destroyRecord: function() {
    if (window.confirm("Are you sure you want to delete this contact?")) {
      this.get('content').deleteRecord();
      this.get('store').commit();

      // return to the main contacts listing page
      this.get('target.router').transitionTo('stocks.index');
    }
  }
  
});

