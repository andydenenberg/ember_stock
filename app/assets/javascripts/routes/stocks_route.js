App.StocksRoute = Ember.Route.extend({

  setupController: function(controller, model) {
    var stocks = App.Stock.find();
    this.controllerFor('stocks').set('stocks', stocks);
  },


  model: function() {
    return App.Stock.find();
  }
});