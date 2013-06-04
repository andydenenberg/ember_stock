//** Views **/
Notes.NotesView = Ember.View.extend({
    elementId: 'notes',
    classNames: ['azureBlueBackground', 'azureBlueBorderThin']
});

Notes.SelectedNoteView = Ember.View.extend({
    elementId: 'selectedNote'
});

Notes.NoteListView = Ember.View.extend({
    elementId: 'noteList',
    template: Ember.Handlebars.compile('' +
        '{{#each controller}}' +
            '{{view Notes.NoteListItemView contentBinding="this"}}' +
        '{{/each}}')
});

Notes.NoteListItemView = Ember.View.extend({
    template: Ember.Handlebars.compile('' +
        '{{name}}' +
        '{{#if view.isSelected}}' +
            '<button {{action doDeleteNote}} class="btn btn-mini floatRight btn-danger smallMarginBottom">Delete</button>' +
        '{{/if}}'),

    classNames: ['pointer', 'noteListItem'],

    classNameBindings: "isSelected",

    isSelected: function() {
	console.log('this.get("controller.selectedNote.name")', this.get('controller.selectedNote')) ;
        return this.get('controller.selectedNote.name') === this.get('content.name');
    }.property('controller.selectedNote.name'),

    click: function() {
        this.get('controller').set('selectedNote', this.get('content'));
    }
});
