App.Router.map(function() {
  this.route("exit", {path: "http://localhost:3000/"})
  this.route("progress", { path: "/progress" });
  this.route("about", { path: "/about" });
  this.resource('contacts', function() {
    this.route('new');
	this.route('edit', { path: '/:contact_id/edit' });
	this.route('delete', { path: '/:contact_id/delete' });
    this.resource('contact', {path: ':contact_id'});
  });
  this.resource('stocks', function() {
	this.route('new');
	this.route('edit', { path: '/:stock_id/edit' });
	this.route('delete', { path: '/:stock_id/delete' });
    this.resource('stock', {path: ':stock_id'});
  });
});

App.ContactsRoute = Ember.Route.extend({
  renderTemplate: function() {
    this.render({ outlet: 'sidebar' });
  },
  model: function() {
    return App.Contact.find();
  }
});

App.ContactRoute = Ember.Route.extend({
  renderTemplate: function() {
    this.render({ outlet: 'second' });
  },
  setupController: function(controller,model) {
	var contact = model
	state = contact.get("stateManager.currentState.name") ;
	store_state = 'contact_id: ' + contact.id + ', state:' + state + ', dirty:' + contact.get("isDirty") ;
	 console.log('contact:', contact.id, 'state:', state, 'is dirty:', contact.get("isDirty") ) ;
	controller.set('store_state', store_state ) ;  
  },


});

App.ContactsEditRoute = Ember.Route.extend({
  renderTemplate: function() {
    this.render('edit_contact', {
      outlet: 'second',
    });
  },
});

App.ContactsNewRoute = Ember.Route.extend({
  renderTemplate: function() {
    this.render('new_contact', {
      outlet: 'second',
    });
  },
  model: function() {
    // Because we are maintaining a transaction locally in the controller for editing,
    // the new record needs to be created in the controller.
    return null;
  },
  setupController: function(controller) {
    controller.startEditing();
  },
  deactivate: function() {
    this.controllerFor('contacts.new').stopEditing();
  }
});

App.ContactsDeleteRoute = Ember.Route.extend({
  renderTemplate: function() {
    this.render('delete_contact', {
      outlet: 'second',
    });
  },
});

App.StocksRoute = Ember.Route.extend({
  renderTemplate: function() {
    this.render({ outlet: 'sidebar' });
  },
  setupController: function(controller, model) {
    var stocks = App.Stock.find();
    this.controllerFor('stocks').set('stocks', stocks);
  },
  model: function() {
    return App.Stock.find();
  }
});

App.StockRoute = Ember.Route.extend({
  renderTemplate: function() {
    this.render({ outlet: 'second' });
  },
  setupController: function(controller, model) {
  }
});

App.ProgressRoute = Ember.Route.extend({
  renderTemplate: function() {
    this.render({ outlet: 'sidebar' });
  },
  model: function() {
    return App.Contact.find();
  }
});

App.AboutRoute = Ember.Route.extend({
  setupController: function(controller, model) {
	 var contacts = App.Contact.find() ;
     this.controllerFor('about').set('contacts', contacts);
  },

  renderTemplate: function() {
    this.render({ outlet: 'sidebar' });
  },
  model: function() {
    return App.Contact.find();
  }
});

App.IndexRoute = Ember.Route.extend({
  redirect: function() {
    this.transitionTo('about');
  }
});

