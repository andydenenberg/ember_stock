App.StocksDeleteController = Em.ObjectController.extend({

	destroyRecord: function() {
    if (window.confirm("Are you sure you want to delete this contact?")) {
      this.get('content').deleteRecord();
      this.get('store').commit();

    console.log('stock_saved');
	  count = 	App.Stock.find().getEach('quantity').reduce(function(
							previousValue, currentValue, index, array){
		  							return Number(previousValue) + Number(currentValue)
									});	
	  App.set('total_quantity', count);


      // return to the main contacts listing page
      this.get('target.router').transitionTo('stocks.index');
    }
  },

	  cancel: function() {

	    console.log('stock_saved');
		  count = 	App.Stock.find().getEach('quantity').reduce(function(
								previousValue, currentValue, index, array){
			  							return Number(previousValue) + Number(currentValue)
										});	
		  App.set('total_quantity', count);


		return this.transitionToRoute('stock', this.content);
	  }


});
