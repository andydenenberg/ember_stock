App.StocksNewController = Em.ObjectController.extend({
	
  startEditing: function() {
    // create a new record on a local transaction

    this.transaction = this.get('store').transaction();
    this.set('content', this.transaction.createRecord(App.Stock, {}));
  },

  stopEditing: function() {
    // rollback the local transaction if it hasn't already been cleared
    if (this.transaction) {
      this.transaction.rollback();
      this.transaction = null;
    }
  },

  save: function() {
    // commit and then clear the local transaction
    this.transaction.commit();
    this.transaction = null;

    console.log('stock_saved');
	  count = 	App.Stock.find().getEach('quantity').reduce(function(
							previousValue, currentValue, index, array){
		  							return Number(previousValue) + Number(currentValue)
									});	
	  App.set('total_quantity', count);

  },

  transitionAfterSave: function() {
	
	     $("#message").hide();

	     $("#flash span").text("Stock successfully created.")
         .show().parent().fadeIn()
         .delay(2000).fadeOut('slow', function() { 
             $("#flash span").text('') 
         });

	
    // when creating new records, it's necessary to wait for the record to be assigned
    // an id before we can transition to its route (which depends on its id)
    if (this.get('content.id')) {
      this.transitionToRoute('stock', this.get('content'));
    }
  }.observes('content.id'),

  cancel: function() {
    this.stopEditing();
    this.transitionToRoute('stocks.index');
  },

  addPhoneNumber: function() {
    this.get('content.phoneNumbers').createRecord();
  },

  removePhoneNumber: function(phoneNumber) {
    phoneNumber.deleteRecord();
  }
});
