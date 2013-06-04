App.StockRoute = Ember.Route.extend({

  setupController: function(controller, model) {
    this.controllerFor('stocks').set('activeStockId', model.get('id'));
  },

  deactivate: function() {
    var controller = this.controllerFor('stock');

    // reset editing state
    if (controller.get('isEditing')) {
      controller.stopEditing();
    }

    // un-highlight the active contact (perhaps temporarily)
    this.controllerFor('stocks').set('activeStockId', null);
  }


});
