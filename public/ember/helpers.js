function numberWithCommas(n) {
    var parts=n.toString().split(".");
    return parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",") + (parts[1] ? "." + parts[1] : "");
}

Ember.Handlebars.registerBoundHelper('decimal', function(contact) {
  return numberWithCommas(Number(contact).toFixed(2))
});

Handlebars.registerHelper('submitButton', function(text) {
  return new Handlebars.SafeString('<button type="submit" class="btn btn-primary">' + text + '</button>');
});

Handlebars.registerHelper('mailto', function(field) {
  var address = this.get(field);
  if (address) {
    return new Handlebars.SafeString('<a href="mailto: ' + address + '" />' + address + '</a>');
  }
});

Ember.Handlebars.registerBoundHelper('decimal', function(contact) {
  return numberWithCommas(Number(contact).toFixed(2))
});