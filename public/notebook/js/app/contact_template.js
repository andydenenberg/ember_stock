Ember.TEMPLATES['CreateContactDialog'] = Ember.Handlebars.compile(
    '<div class="modal-header centerAlign">' +
        '<button type="button" class="close" data-dismiss="modal" class="floatRight">×</button>' +
        '<h1 class="centerAlign">{{view.header}}</h1>' +
    '</div>' +
    '<div class="modal-body">' +
        '{{view.message}}' +
         

		'<form class="form-horizontal">' +
		  '<div class="control-group">' +
		    '<label class="control-label" for="inputEmail">First Name</label>' +
		    '<div class="controls">' +
		      '{{view Ember.TextField valueBinding="newContactfirstName"}}' + 
		    '</div>' +
		  '</div>' +
		  '<div class="control-group">' +
		    '<label class="control-label" for="inputEmail">Last Name</label>' +
		    '<div class="controls">' +
		      '{{view Ember.TextField valueBinding="newContactlastName"}}' + 
		    '</div>' +
		  '</div>' +
		  '<div class="control-group">' +
		    '<label class="control-label" for="inputEmail">Email</label>' +
		    '<div class="controls">' +
		      '{{view Ember.TextField valueBinding="newContactEmail"}}' + 
		    '</div>' +
		  '</div>' +
		'</form>' +

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


Ember.TEMPLATES['contact'] = Ember.Handlebars.compile('' +
'<a href="/" class="btn btn-mini" >Exit</a> ' +

'<button {{action doCreateContact}} class="btn btn-mini btn-info">Add Contact</button><br><br>' +
'{{view Notes.ContactListView}}' +
'<br><a href="/notebook.html">Notebook</a> | <b>Contact</b>' +

'{{view Notes.ConfirmDialogView ' +
    'elementId="confirmDeleteConfirmDialog" ' +
    'okAction="doConfirmDelete" ' +
    'cancelAction="doCancelDelete" ' +
    'target="controller" ' +
    'header="Delete selected Contact?" ' +
    'message="Are you sure you want to delete the selected Contact? This action cannot be be undone!"' +
'}}' 	 +

'{{view Notes.CreateContactDialogView ' +
    'elementId="createContactDialog" ' +
    'okAction="createNewContact" ' +
    'cancelAction="doCancelCreate" ' +
    'target="controller" ' +
    'header="Create Contact" ' +
    'message=""' +
'}}'

 );

Ember.TEMPLATES['selectedContact'] = Ember.Handlebars.compile('' +
'{{#if controller.content}}' +
    '<h1>{{fullName}}</h1><br>' +
	'Portfolio Value: ${{decimal portfolio_value}}<br>' +
	'Number of Stocks: {{length stocks}}<br><br>' +
    'Notes:<br>{{view Ember.TextArea valueBinding="notes"}}' +
	'{{#if stocks.length}}' +
		'{{partial "stocks"}}' +
	'{{/if}}' +
'{{/if}}'
);

Ember.TEMPLATES['_stocks'] = Ember.Handlebars.compile('' +
 '<table class="table table-bordered table-striped table-condensed">' +
  '{{partial "stock_table_header"}}' +
  '{{#each stock in stocks}}' +
	'{{partial "stock_table"}}' +
  '{{/each}}' +
	'<tr>' +
	'<td>Total</td>' +
	'<td></td>' +
	'<td></td>' +
	'<td style="text-align:right;">${{total_cost}}</td>' +
	'<td></td>' +
	'<td></td>' +
	'<td></td>' +
	'<td></td>' +
	'</tr>' +
  '</table>'
);

Ember.TEMPLATES['_stock_table_header'] = Ember.Handlebars.compile('' +
'<tr>' +
	'<th>Symbol</th>' +
	'<th>Quantity</th>' +
	'<th>Purchase Price</th>' +
	'<th>Cost</th>' +
	'<th>Date Acquired</th>' +
	'<th>ID</th>' +
	'<th>Contact</th>' +
	'<th>Controls</th>' +
'</tr>'
);

Ember.TEMPLATES['_stock_table'] = Ember.Handlebars.compile('' +
'<tr>' +
'<td>{{stock.symbol}}</td>' +
'<td style="text-align:right;"> {{decimal stock.quantity}} </td>' +
'<td style="text-align:right;"> ${{decimal stock.purchase_price}} </td>' +
'<td style="text-align:right;"> ${{decimal stock.position_cost}} </td>' +
'<td> {{stock.created}} </td>' +
'<td> {{stock.id}}</td>' +
'<td> {{stock.contact.fullName}}</td>' +
'<td> Edit' +
'</td>' +
'</tr>'
);


