

// Create a simple controller to hold values that will be shared across
// views.
App.ApplicationController = Em.Controller.extend({
  progress: 0,
  menuDisabled: true,
  people: [],
  goProgress: function() {
	 	return this.transitionToRoute('progress');
	},
	
  Exit: function() {
	 	return this.transitionToRoute('exit');
	},

  goHome: function() {
	 	return this.transitionToRoute('about');
	},
	
  goContacts: function() {
	 	return this.transitionToRoute('contacts');
	},
	
  incrementProgress: function() {
    // Get the current progress value.
    var val = this.get('progress');

    if(val < 100) {
      // If the value is less than 100, increment it.
      this.incrementProperty('progress');

      // Schedule another incrementProgress call in 30ms.
      Ember.run.later(this, this.incrementProgress, 30);
    }
  }
});


App.ProgressController = Em.Controller.extend({
  progress: 0,
  menuDisabled: true,
  people: [],
  incrementProgress: function() {
    // Get the current progress value.
    var val = this.get('progress');

    if(val < 100) {
      // If the value is less than 100, increment it.
      this.incrementProperty('progress');

      // Schedule another incrementProgress call in 30ms.
      Ember.run.later(this, this.incrementProgress, 30);
    }
  }
});

// Create a subclass of `JQ.ButtonView` to define behavior for our button.
App.goProgressView = JQ.ButtonView.extend({
  // When the button is clicked...
  click: function() {
	this.get('controller').goProgress();
   }
});

// Create a subclass of `JQ.ButtonView` to define behavior for our button.
App.ExitView = JQ.ButtonView.extend({
  // When the button is clicked...
  click: function() {
	this.get('controller').Exit();
   }
});

// Create a subclass of `JQ.ButtonView` to define behavior for our button.
App.goHomeView = JQ.ButtonView.extend({
  // When the button is clicked...
  click: function() {
	this.get('controller').goHome();
   }
});

// Create a subclass of `JQ.ButtonView` to define behavior for our button.
App.goContactsView = JQ.ButtonView.extend({
  // When the button is clicked...
  click: function() {
	this.get('controller').goContacts();
   }
});

// Create a subclass of `JQ.ButtonView` to define behavior for our button.
App.ButtonView = JQ.ButtonView.extend({
  // When the button is clicked...
  click: function() {
    // Disable the button.
    this.set('disabled', true);

    // Increment the progress bar by delegating to the controller.
    this.get('controller').incrementProgress();
  }
});

// Create a subclass of `JQ.ProgressBarView` to define behavior for our
// progress bar.
App.ProgressBarView = JQ.ProgressBarView.extend({
  // When the jQuery UI progress bar reaches 100%, it will invoke the
  // `complete` event. Recall that JQ.Widget registers a callback for
  // the `complete` event in `didInsertElement`, which calls the
  // `complete` method.
  complete: function() {
    // When the progress bar finishes, update the controller with the
    // list of people. Because our template binds the JQ.MenuView to this
    // value, it will automatically populate with the new people and
    // refresh the menu.
	contacts = App.Contact.find() ;
	people_controller = this.get('controller.people');
	contacts.forEach(function(contact) {
		em = Em.Object.create({
		        name: contact.get('fullName') + ' $' + contact.get('portfolio_value'),
		 		contact: contact,
		     });
		people_controller.pushObject(em)
//	    people_controller.set('controller.people', contact.get('fullName'));
    });
    
//    this.set('controller.people', [
//      Em.Object.create({
//        name: "Tom DAAAAALE"
//      }),
//      Em.Object.create({
//        name: "Yehuda Katz"
//      }),
//      Em.Object.create({
//        name: "Selden Seen"
//      })
//    ]);

    // Set the `menuDisabled` property of our controller to false.
    // Because the JQ.MenuView binds its `disabled` property to
    // the controller's menuDisabled, this will enable it.
    this.set('controller.menuDisabled', false);
  }
});

/**
Template:

{{view App.ButtonView label="Click to Load People"}}
<br><br>
{{view App.ProgressBarView valueBinding="progress"}}
<br><br>
{{#collection JQ.MenuView contentBinding="people" disabledBinding="menuDisabled"}}
  <a href="#">{{name}}</a>
{{else}}
  <a href="#">LIST NOT LOADED</a>
{{/collection}}
*/
