/*****************************************************************************/
/* Supervisor: Event Handlers */
/*****************************************************************************/
Template.Supervisor.events({
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
  }
});

/*****************************************************************************/
/* Supervisor: Helpers */
/*****************************************************************************/
Template.Supervisor.helpers({
  'app': function(){
    return App.find().fetch()[0];
  },
  'time': function(){
    return moment(TimeSync.serverTime()).format("MM/DD/YYYY hh:mm:ss a");
  },
  'queue': function(){
    var a = Queue.find({category: "Type A"}).count(),
        b = Queue.find({category: "Type B"}).count(),
        c = Queue.find({category: "Type C"}).count(),
        d = Queue.find({category: "Type D"}).count(),
        e = Queue.find({category: "Type E"}).count();

    return {a: a, b: b, c: c, d: d, e: e};
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

/*****************************************************************************/
/* Supervisor: Lifecycle Hooks */
/*****************************************************************************/
Template.Supervisor.created = function () {
};

Template.Supervisor.rendered = function () {
};

Template.Supervisor.destroyed = function () {
};
