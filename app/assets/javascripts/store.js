App.Adapter = DS.RESTAdapter.extend({
  bulkCommit: false,
  url: 'http://localhost:3000'

});

App.Adapter.map('App.Contact', {
  phoneNumbers: {embedded: 'always'},
  stocks: {embedded: 'always'}
});

//App.Adapter.map('App.Stock');

App.Store = DS.Store.extend({
  revision: 12,
  adapter:  App.Adapter.create()
});
