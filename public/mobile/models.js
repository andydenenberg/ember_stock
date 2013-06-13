App.Contact  = DS.Model.extend({
  firstName:    DS.attr('string'),
  lastName:     DS.attr('string'),
  email:        DS.attr('string'),
  notes:        DS.attr('string'),
  stocks:       DS.hasMany('App.Stock'),
  phoneNumbers: DS.hasMany('App.PhoneNumber'),

// to handle ember-data update/create errors, simply define becameError() and becameInvalid(errors) on your DS.Model instance.
// The cascade triggered by the RESTadapter's AJAX error callback will eventually call these functions you define.
  becameError: function() {
    return alert('there was an error!');
  },
  becameInvalid: function(errors) {
    return alert("Record was invalid because: " + errors);
  },

  state: function() {	
	state = this.get("stateManager.currentState.name") ;
	return state
   }.property('isDirty').cacheable(),

  portfolio_value: function() {
	var stocks = this.get('stocks') ;
		cost = 0 ;
		stocks.forEach(function(stock){
			cost += stock.get('quantity') * stock.get('purchase_price') ;							
		});		
	return cost // stocks.get('length')
   }.property("stocks.@each").cacheable(),

  fullName: function() {
    var firstName = this.get('firstName'),
        lastName = this.get('lastName');

    if (!firstName && !lastName) {
      if (Ember.isNone(this.get('id'))) {
        return '(New Contact)';
      } else {
        return '(No Name)';
      }
    }

    if (firstName === undefined) firstName = '';
    if (lastName === undefined) lastName = '';

    return firstName + ' ' + lastName;
  }.property('firstName', 'lastName'),

  gravatar: function() {
    var email = this.get('email');
    if (!email) email = '';
    return 'http://www.gravatar.com/avatar/' + MD5(email);
  }.property('email')
});

App.PhoneNumber = DS.Model.extend({
  number:  DS.attr('string'),
  contact: DS.belongsTo('App.Contact')
});

App.Stock  = DS.Model.extend({
  symbol: DS.attr('string'),
  quantity: DS.attr('number'),
  purchase_price: DS.attr('number'),
  last_price: DS.attr('number'),
  created_at: DS.attr('string'),
  created_date: DS.attr('string'), // javascript ready from rails serializer
  contact: DS.belongsTo('App.Contact'),

  created: function() {
	var created_date = this.get('created_date');
//	year = Date(created_date * 1000).getFullYear() ;
    return created_date // Date(created_date * 1000);
  }.property('created_date'),

  position_cost: function() {
	var cost = this.get('quantity') * this.get('purchase_price') ;
	return cost
  }.property('quantity', 'purchase_price')

});


