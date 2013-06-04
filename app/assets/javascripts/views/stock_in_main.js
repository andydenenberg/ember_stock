App.StockInMainView = Em.View.extend({
  templateName: '_stock',
  tagName: '', // could be tr or li
  classNameBindings: 'isActive:active',

  isActive: function() {
    return this.get('content.id') === this.get('controller.activeStockId');
  }.property('controller.activeStockId')
});
