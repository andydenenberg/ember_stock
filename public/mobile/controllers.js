Popover = Ember.View.extend({
            parentSelector: '',
            contentSelector: '',
            didInsertElement: function () {
                var self = this;
                $(self.parentSelector).popover({
                    html: true,
                    title: self.title,
                    placement: 'right',
                    content: function() {
                        var $content = $(self.contentSelector);
                        return $content.html();
                    }
                });
            },
            close: function() {
                $(this.parentSelector).popover('hide');
            }
        });

App.AboutController  = Em.ArrayController.extend({
  people: function() {
	var contacts = this.get('contacts') ;
	people = [ ]
	contacts.forEach(function(contact){

			em = Em.Object.create({
			        name: contact.get('fullName') + ' $' + contact.get('portfolio_value') + ' | ' + contact.get('state'),
			 		contact: contact,
			     });
			people.pushObject(em)
	});
	return people
	}.property("contacts.@each").cacheable(),  
	
});


App.ContactsDeleteController  = Em.ObjectController.extend({
  destroyRecord: function() {
    if (window.confirm("Are you sure you want to delete this contact?")) {
      this.get('content').deleteRecord();
      this.get('store').commit();
      // return to the main contacts listing page
      this.get('target.router').transitionTo('contacts.index');
    }
  }	
});

App.ContactController = Em.ObjectController.extend({
  isEditing: false,
  needs: ['contactsEdit'],

  total_cost: function() {
	var stocks = this.get('stocks') ;
	cost = 0 ;
	stocks.forEach(function(object){
	cost += object.get('quantity') * object.get('purchase_price') ;
	});
	return numberWithCommas(cost.toFixed(2))
	}.property("stocks.@each").cacheable(),  

  startEditing: function() {
	// add the contact and its associated phone numbers to a local transaction
	var contact = this.get('content');	

	if ( contact.get('state') != 'error' && !contact.get("isDirty") )  {
	
//	if (!contact.get("isDirty") ) {
//		
//		if ( contact.get('state') != 'error' ) {
//		var transaction = this.transaction;
//	      if (transaction) {
//	        transaction.rollback();
//	        this.transaction = undefined;
//	      }
//        }
//	    
		
		var transaction = contact.get('store').transaction();
		transaction.add(contact);
		contact.get('phoneNumbers').forEach(function(phoneNumber) {
		  transaction.add(phoneNumber);
		});
		contact.get('stocks').forEach(function(stock) {
		  transaction.add(stock);
		});
		this.transaction = transaction;		
	}
	else { alert('isDirty') }	
   	this.set('isEditing', true);
  },

  stopEditing: function() {
    var contactEditController = this.get('controllers.contactsEdit');
    contactEditController.stopEditing();
    this.set('isEditing', false);
  },

  save: function() {	
	this.transaction.commit();
	this.transaction = undefined;
	this.set('isEditing', false);
  },

  cancel: function() {
    var transaction = this.transaction;
    if (transaction) {
      transaction.rollback();
      this.transaction = undefined;
	};
	this.set('isEditing', false);
	return this.transitionToRoute('contact', this.content);
  },

  destroyRecord: function() {
    if (window.confirm("Are you sure you want to delete this contact?")) {
      this.get('content').deleteRecord();
      this.get('store').commit();
      // return to the main contacts listing page
      this.get('target.router').transitionTo('contacts.index');
    }
  },
	  addPhoneNumber: function() {
		alert('pn') ;
	    this.get('content.phoneNumbers').createRecord();
	  },
	  removePhoneNumber: function(phoneNumber) {
	    phoneNumber.deleteRecord();
	  },
	  addStock: function() {
		alert('as') ;

	    this.get('content.stocks').createRecord();
	  },
	  removeStock: function(stock) {
	    stock.deleteRecord();
	  }
});


App.ContactsEditController = Em.ObjectController.extend({
  needs: ['contact'],

  startEditing: function() {
    // add the contact and its associated phone numbers to a local transaction
    var contact = this.get('content');
    var transaction = contact.get('store').transaction();
    transaction.add(contact);
    contact.get('phoneNumbers').forEach(function(phoneNumber) {
      transaction.add(phoneNumber);
    });
    contact.get('stocks').forEach(function(stock) {
      transaction.add(stock);
    });
    this.transaction = transaction;
  },

  stopEditing: function() {
    // rollback the local transaction if it hasn't already been cleared
    var transaction = this.transaction;
    if (transaction) {
      transaction.rollback();
      this.transaction = undefined;
    }
  },

  save: function() {
	contact = this.get('content') ;
	console.log('contact:' , contact) ;	
	state = contact.get("stateManager.currentState.name") ;    
	console.log('contact state: ', state) ;
	
    this.store.commit();

	state = contact.get("stateManager.currentState.name") ;    
	console.log('contact state: ', state) ;
	return this.transitionToRoute('contact', this.content);
  },

  cancel: function() {
	return this.transitionToRoute('contact', this.content);
  },

  addPhoneNumber: function() {
	alert('pn') ;
    this.get('content.phoneNumbers').createRecord();
  },
  removePhoneNumber: function(phoneNumber) {
    phoneNumber.deleteRecord();
  },

  addStock: function() {
	alert('as') ;
	
    this.get('content.stocks').createRecord();
  },
  removeStock: function(stock) {
    stock.deleteRecord();
  }
});

App.ContactsNewController = Em.ObjectController.extend({	
  startEditing: function() {
    // create a new record on a local transaction
    this.transaction = this.get('store').transaction();
    this.set('content', this.transaction.createRecord(App.Contact, {}));
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
  },
  transitionAfterSave: function() {
    // when creating new records, it's necessary to wait for the record to be assigned
    // an id before we can transition to its route (which depends on its id)
    if (this.get('content.id')) {
      this.transitionToRoute('contact', this.get('content'));
    }
  }.observes('content.id'),
  cancel: function() {
    this.stopEditing();
    this.transitionToRoute('contacts.index');
  },
  addPhoneNumber: function() {
    this.get('content.phoneNumbers').createRecord();
  },
  removePhoneNumber: function(phoneNumber) {
    phoneNumber.deleteRecord();
  },
  addStock: function() {
    this.get('content.stocks').createRecord();
  },
  removeStock: function(stock) {
    stock.deleteRecord();
  }
});

App.StocksController = Em.ArrayController.extend({
	hello: 1,
	
  total_cost: function() {
	var stocks = this.get('stocks') ;
	cost = 0 ;
	stocks.forEach(function(object){
	cost += object.get('quantity') * object.get('purchase_price') ;
	});
	return numberWithCommas(cost.toFixed(2))
	}.property("stocks.@each").cacheable()  
	
});

