App.Contact  = DS.Model.extend({
  firstName:    DS.attr('string'),
  lastName:     DS.attr('string'),
  email:        DS.attr('string'),
  notes:        DS.attr('string'),
  stocks:       DS.hasMany('App.Stock'),
  phoneNumbers: DS.hasMany('App.PhoneNumber'),
  state: function() {	
	state = this.get("stateManager.currentState.name") ;
	return state
   }.property('isDirty').cacheable(),

  portfolio_value: function() {
	cost = 0 ;
	this.get('stocks').forEach(function(stock){
			cost += stock.get('quantity') * stock.get('purchase_price') ;				
		});
	return cost
 	}.property('stocks.@each').cacheable(),

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

    return firstName + ' ' + lastName ;
  }.property('firstName', 'lastName'),

  gravatar: function() {
    var email = this.get('email');
    if (!email) email = '';
    return 'http://www.gravatar.com/avatar/' + MD5(email);
  }.property('email'),


	didLoad: function() {
    console.log('contact:didLoad model:', this.toJSON());
  },

});
