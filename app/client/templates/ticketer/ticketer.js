/*****************************************************************************/
/* Ticketer: Event Handlers */
/*****************************************************************************/
Template.Ticketer.events({
  'click button': function(e){
    //@TODO: authenticate the type
    var category = $(e.target).closest("li[data-category]").data("category"),
        type = $(e.target).closest("li[data-type]").data("type"),
        name = $(e.target).data("name");

    Meteor.call("createTicket", category, type, name);
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
