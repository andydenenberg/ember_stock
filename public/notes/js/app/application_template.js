
//** Templates **/
Ember.TEMPLATES['application'] = Ember.Handlebars.compile('' +
    '{{outlet}}' +
	'{{#if contact_state}}' +
		'{{render selectedContact}}' +
	'{{/if}}' +
	'{{#if note_state}}' +
		'{{render selectedNote}}' +
	'{{/if}}'
);

Ember.TEMPLATES['confirmDialog'] = Ember.Handlebars.compile(
    '<div class="modal-header centerAlign">' +
        '<button type="button" class="close" data-dismiss="modal" class="floatRight">×</button>' +
        '<h1 class="centerAlign">{{view.header}}</h1>' +
    '</div>' +
    '<div class="modal-body">' +
        '{{view.message}}' +
    '</div>' +
    '<div class="modal-footer">' +
        '{{#if view.cancelAction}}' +
            '{{view Notes.BootstrapButton ' +
                'contentBinding="view.cancelButtonLabel" ' +
                'actionBinding="view.cancelAction" ' +
                'targetBinding="view.target"}}' +
        '{{/if}}' +
        '{{#if view.okAction}}' +
            '{{view Notes.BootstrapButton ' +
                'contentBinding="view.okButtonLabel" ' +
                'actionBinding="view.okAction" ' +
                'targetBinding="view.target"}}' +
        '{{/if}}' +
    '</div>'
);





