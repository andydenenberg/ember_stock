//** Views **/
Notes.ContactView = Ember.View.extend({
    elementId: 'notes',
    classNames: ['azureBlueBackground', 'azureBlueBorderThin']
});

Notes.SelectedContactView = Ember.View.extend({
    elementId: 'selectedContact',
});

Notes.TextField = Ember.TextField.extend(Ember.TargetActionSupport, {
    insertNewline: function() {
        this.triggerAction();
    }
});

Notes.ContactListView = Ember.View.extend({
    elementId: 'contactList',
    template: Ember.Handlebars.compile('' +
        '{{#each controller}}' +
            '{{view Notes.ContactListItemView contentBinding="this"}}' +
        '{{/each}}')
});

Notes.ContactListItemView = Ember.View.extend({
    template: Ember.Handlebars.compile('' +
        '{{fullName}}'  +
        '{{#if view.isSelected}}' +
            '<button {{action doDeleteContact}} class="btn btn-mini floatRight btn-danger smallMarginBottom">Delete</button>' +
        '{{/if}}'
        ),

    classNames: ['pointer', 'noteListItem'],

    classNameBindings: "isSelected",

    isSelected: function() {
		selected = this.get('controller').get('selected') ;
        return selected === this.get('content');
    }.property('controller.selected'),

    click: function() {
        this.get('controller').set('selected', this.get('content'));
    }
});

Notes.CreateContactDialogView = Ember.View.extend({
    templateName: 'CreateContactDialog',
    classNames: ['modal', 'hide'],

    cancelButtonLabel: 'Cancel',
    cancelAction: null,
    okButtonLabel: "OK",
    okAction: null,
    header: null,
    message: null,
    target: null
});


