Ember.TEMPLATES['notes'] = Ember.Handlebars.compile('' +
    '{{view Notes.TextField target="controller" action="createNewNote" classNames="input-small search-query mediumTopPadding" valueBinding="controller.newNoteName"}}' +
    '<button class="btn" {{action createNewNote}}>New Note</button>' +
    '{{view Notes.NoteListView}}' +
	'<br><b>Notebook</b> | <a href="#contacts">Contact</a><br>' +
    '{{view Notes.ConfirmDialogView ' +
        'elementId="confirmDeleteConfirmDialog" ' +
        'okAction="doConfirmDelete" ' +
        'cancelAction="doCancelDelete" ' +
        'target="controller" ' +
        'header="Delete selected note?" ' +
        'message="Are you sure you want to delete the selected Note? This action cannot be be undone!"' +
    '}}'
);

Ember.TEMPLATES['selectedNote'] = Ember.Handlebars.compile('' +
    '{{#if controller.content}}' +
        '<h1>{{name}}</h1>' +
        '{{view Ember.TextArea valueBinding="value"}}' +
    '{{/if}}'
);

