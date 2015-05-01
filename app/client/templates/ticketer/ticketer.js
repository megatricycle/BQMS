/*****************************************************************************/
/* Ticketer: Event Handlers */
/*****************************************************************************/
Template.Ticketer.events({
  'click button': function(){
    //@TODO: authenticate the type
    Meteor.call("createTicket");
  }
});

/*****************************************************************************/
/* Ticketer: Helpers */
/*****************************************************************************/
Template.Ticketer.helpers({
});

/*****************************************************************************/
/* Ticketer: Lifecycle Hooks */
/*****************************************************************************/
Template.Ticketer.created = function () {
};

Template.Ticketer.rendered = function () {
};

Template.Ticketer.destroyed = function () {
};
