App.Router.map(function() {
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
