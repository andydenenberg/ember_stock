var Notes = Ember.Application.create({LOG_TRANSITIONS: true});

Notes.deferReadiness();


Notes.Adapter = DS.RESTAdapter.extend({
  bulkCommit: false,
//  url: 'http://localhost:3000'
});

Notes.Adapter.map('Notes.Contact', {
  phoneNumbers: {embedded: 'always'},
  stocks: {embedded: 'always'}
});

Notes.Store = DS.Store.extend({
  revision: 12,
  adapter:  Notes.Adapter.create()
});


