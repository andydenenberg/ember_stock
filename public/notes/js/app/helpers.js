function numberWithCommas(n) {
    var parts=n.toString().split(".");
    return parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",") + (parts[1] ? "." + parts[1] : "");
}

Notes.Handlebars.registerBoundHelper('decimal', function(contact) {
  return numberWithCommas(Number(contact).toFixed(2))
});
