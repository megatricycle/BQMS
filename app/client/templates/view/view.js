/*****************************************************************************/
/* View: Event Handlers */
/*****************************************************************************/
Template.View.events({
});

/*****************************************************************************/
/* View: Helpers */
/*****************************************************************************/
Template.View.helpers({
  'counter': function(){
    return Meteor.users.find({"profile.type": "counter"}, {
      "profile.id": 1,
      "profile.currently_serving": 1
    });
  }
});

/*****************************************************************************/
/* View: Lifecycle Hooks */
/*****************************************************************************/
Template.View.created = function () {
};

Template.View.rendered = function () {
};

Template.View.destroyed = function () {
};
