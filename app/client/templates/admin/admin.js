/*****************************************************************************/
/* Admin: Event Handlers */
/*****************************************************************************/
Template.Admin.events({

});

/*****************************************************************************/
/* Admin: Helpers */
/*****************************************************************************/
Template.Admin.helpers({
  admins: function(){
    return Meteor.users.find({'profile.type': 'admin'});
  },
  views: function(){
    return Meteor.users.find({'profile.type': 'view'});
  },
  supervisors: function(){
    return Meteor.users.find({'profile.type': 'supervisor'});
  },
  ticketers: function(){
    return Meteor.users.find({'profile.type': 'ticketer'});
  },
  counters: function(){
    return Meteor.users.find({'profile.type': 'counter'});
  }
});

/*****************************************************************************/
/* Admin: Lifecycle Hooks */
/*****************************************************************************/
Template.Admin.created = function () {
};

Template.Admin.rendered = function () {
};

Template.Admin.destroyed = function () {
};
