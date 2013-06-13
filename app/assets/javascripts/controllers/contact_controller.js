App.ContactController = Em.ObjectController.extend({
  isEditing: false,
  needs: ['contactEdit'],

  startEditing: function() {
    var contactEditController = this.get('controllers.contactEdit');
    contactEditController.set('content', this.get('content'));
    contactEditController.startEditing();
    this.set('isEditing', true);
  },

  stopEditing: function() {
    var contactEditController = this.get('controllers.contactEdit');
    contactEditController.stopEditing();
    this.set('isEditing', false);
  },

  destroyRecord: function() {
    if (window.confirm("Are you sure you want to delete this contact?")) {
	  var stocks = this.get('content').get('stocks')
	  stocks.forEach(function(stock) {
			console.log('stock') ;
			stock.deleteRecord() ;
		});
      this.get('content').deleteRecord();
      this.get('store').commit();
      // return to the main contacts listing page
      this.get('target.router').transitionTo('contacts.index');
    }
  }
});
