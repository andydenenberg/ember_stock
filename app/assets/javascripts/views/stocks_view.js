App.StocksView = Em.View.extend({
	didInsertElement: function() {
        this.$('#flash').hide();
    }
});

App.RefreshStocksButton = Em.View.extend({
  classNames: ['delete-tier-view'],
  tagName: 'button',
  click: function () {

alert('in stock_views.js') ;
  }
});