App.StocksRoute = Ember.Route.extend({

  redirect: function() {
	if (!App.get('logged_in_state')) {
		flash_message('You must first login to access Stocks.', 'warning') ;	
		this.transitionTo('login');		
	}
  },

  model: function() {
    // request all stocks from adapter
    return App.Stock.find();


    // filter stocks to exclude new ones
    return App.Stock.filter(function(stock) {
      return stock.get('id');
    });
  },

  setupController: function(controller, model) {
	
	controller.set('model', model ) ;
	
	// check and remove any stock records created, but not persisted in server ( id: null ) 
//	controller.clean_up() ;
	
	
//    var stocks = App.Stock.find();
//    this.controllerFor('stocks').set('stocks', stocks);
  },


});