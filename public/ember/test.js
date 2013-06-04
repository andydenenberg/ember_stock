
App = Em.Application.create({
	LOG_TRANSITIONS: true,
	});

// Defer App readiness until it should be advanced for either
// testing or production.
App.deferReadiness();

