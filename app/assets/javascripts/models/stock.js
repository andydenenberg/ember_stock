App.Stock  = DS.Model.extend({
  symbol: DS.attr('string'),
  quantity: DS.attr('number'),
  purchase_price: DS.attr('number'),
  last_price: DS.attr('number'),
  created_at: DS.attr('string'),
  created_date: DS.attr('string'), // javascript ready from rails serializer
  contact: DS.belongsTo('App.Contact'),
  state: function() {	
	state = this.get("stateManager.currentState.name") ;
	return state
   }.property('isDirty').cacheable(),


//	didUpdate: function() {
// 	},
// 	didCreate: function() {
//   		alert('Stock Created') ;
// 	},

  created: function() {
	var created_date = this.get('created_date');
//	year = Date(created_date * 1000).getFullYear() ;
    return created_date // Date(created_date * 1000);
  }.property('created_date'),

  position_cost: function() {
	return this.get('quantity') * this.get('purchase_price')
  }.property('quantity', 'purchase_price'),

//	didLoad: function() {
//    console.log('stock:didLoad model:', this.toJSON() );
//  },


});
