/*****************************************************************************/
/* Admin: Event Handlers */
/*****************************************************************************/
Template.Admin.events({
  'submit #app-form': function(e){
    e.preventDefault();

    var name = $("#app-form").find("#app-form-name").val();

    Meteor.call('appName', name);
  },
  'submit #create-admin': function(e){
    e.preventDefault();

    var username = $("#create-admin").find("#create-admin-username").val(),
        password = $("#create-admin").find("#create-admin-password").val();

    Meteor.call('newUser', username, password, "admin");

    $("#create-admin")[0].reset()
  },
  'submit #create-view': function(e){
    e.preventDefault();

    var username = $("#create-view").find("#create-view-username").val(),
        password = $("#create-view").find("#create-view-password").val();

    Meteor.call('newUser', username, password, "view");

    $("#create-view")[0].reset()
  },
  'submit #create-supervisor': function(e){
    e.preventDefault();

    var username = $("#create-supervisor").find("#create-supervisor-username").val(),
        password = $("#create-supervisor").find("#create-supervisor-password").val();

    Meteor.call('newUser', username, password, "supervisor");

    $("#create-supervisor")[0].reset()
  },
  'submit #create-ticketer': function(e){
    e.preventDefault();

    var username = $("#create-ticketer").find("#create-ticketer-username").val(),
        password = $("#create-ticketer").find("#create-ticketer-password").val();

    Meteor.call('newUser', username, password, "ticketer");

    $("#create-ticketer")[0].reset()
  },
  'submit #create-counter': function(e){
    e.preventDefault();

    var username = $("#create-counter").find("#create-counter-username").val(),
        password = $("#create-counter").find("#create-counter-password").val(),
        id = $("#create-counter").find("#create-counter-id").val(),
        msr = $("#create-counter").find("#create-counter-MSR").val(),
        privilages = [];

      //select all privilages
      $("#create-counter").find("input:checked").each(function(){
        privilages.push(this.value);
      });

    Meteor.call('newUser', username, password, "counter", id, msr, privilages);

    $("#create-counter")[0].reset()
  }
});

/*****************************************************************************/
/* Admin: Helpers */
/*****************************************************************************/
Template.Admin.helpers({
  app: function(){
    return App.findOne();
  },
  admins: function(){
    return Meteor.users.find({'profile.type': 'admin'}, {$sort: {createdAt: 1}});
  },
  views: function(){
    return Meteor.users.find({'profile.type': 'view'}, {$sort: {createdAt: 1}});
  },
  supervisors: function(){
    return Meteor.users.find({'profile.type': 'supervisor'}, {$sort: {createdAt: 1}});
  },
  ticketers: function(){
    return Meteor.users.find({'profile.type': 'ticketer'}, {$sort: {createdAt: 1}});
  },
  counters: function(){
    return Meteor.users.find({'profile.type': 'counter'}, {$sort: {createdAt: 1}});
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
