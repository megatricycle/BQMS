/*****************************************************************************/
/* View: Event Handlers */
/*****************************************************************************/
Template.View.events({
});

/*****************************************************************************/
/* View: Helpers */
/*****************************************************************************/
Template.View.helpers({
  'app': function(){
    return App.find().fetch()[0];
  },
  'counter': function(){
    return Meteor.users.find({"profile.type": "counter"}, {
      "profile.id": 1,
      "profile.currently_serving": 1
    });
  },
  'time': function(){
    return moment(TimeSync.serverTime()).format("MM/DD/YYYY hh:mm:ss a");
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
