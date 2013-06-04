App.ContactInMainView = Em.View.extend({
  templateName: 'contact_in_main',
  tagName: '', // could be tr or li
  classNameBindings: 'isActive:active',

  isActive: function() {
    return this.get('content.id') === this.get('controller.activeContactId');
  }.property('controller.activeContactId')
});
