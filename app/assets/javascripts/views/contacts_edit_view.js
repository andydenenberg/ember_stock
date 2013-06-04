App.ContactsEditView = Ember.View.extend({
  didInsertElement: function() {
    this.$('input:first').focus();
  }
});