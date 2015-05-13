/*****************************************************************************/
/* Admin: Event Handlers */
/*****************************************************************************/
Template.Admin.events({
  'click #accounts': function(){
    Session.set("current", "Accounts");
  },
  'click #appSettings': function(){
    Session.set("current", "AppSettings");
  },
  'click #videos': function(){
    Session.set("current", "Videos");
  }
});

Template.Accounts.events({
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

    $("#create-counter")[0].reset();
  },
  'submit #edit-counter': function(e){
    e.preventDefault();

    var id = $("#edit-counter").find("#edit-counter-id").val(),
        msr = $("#edit-counter").find("#edit-counter-MSR").val(),
        privilages = [];

      //select all privilages
      $("#edit-counter").find("input:checked").each(function(){
        privilages.push(this.value);
      });

    Meteor.call('editCounter', this._id, id, msr, privilages);

    Session.set('selected', null);
  },
  'click .edit-btn': function(){
    Session.set('selected', this.username);
  },
  'click .delete-btn': function(){
    Meteor.call("removeUser", this._id);
  }
});

Template.AppSettings.events({
  'submit #app-form': function(e){
    e.preventDefault();

    var name = $("#app-form").find("#app-form-name").val();

    Meteor.call('appName', name);
  }
});

Template.Videos.events({
  'click #upload-button': function(){
    $('#video-file').click();
  },
  'change #video-file': function(){
    console.log("HYA!");
  }
});

/*****************************************************************************/
/* Admin: Helpers */
/*****************************************************************************/
Template.Admin.helpers({
  current: function(){
    return Session.get("current");
  },
  'app': function(){
    return App.find().fetch()[0];
  },
  'time': function(){
    return moment(TimeSync.serverTime()).format("MM/DD/YYYY hh:mm:ss a");
  }
});

Template.Accounts.helpers({
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
  },
  selected: function(id){
    return Session.get('selected') == id? true: false;
  },
  isChecked: function(privilages, category){
    return privilages.indexOf(category) == -1? '': "checked";
  }
});

Template.AppSettings.helpers({
  app: function(){
    return App.findOne();
  }
});


/*****************************************************************************/
/* Admin: Lifecycle Hooks */
/*****************************************************************************/
Template.Admin.created = function () {
  Session.set("current", "Accounts");
};

Template.Admin.rendered = function () {
};

Template.Admin.destroyed = function () {
};
