/*****************************************************************************/
/* Ticketer: Event Handlers */
/*****************************************************************************/
Template.Ticketer.events({
  'click #typeA': function(){
    Session.set('current', "type_a");
  },
  'click #typeB': function(){
    Session.set('current', "type_b");
  },
  'click #typeC': function(){
    Session.set('current', "type_c");
  },
  'click #typeD': function(){
    Session.set('current', "type_d");
  },
  'click #typeE': function(){
    Session.set('current', "type_e");
  },
  'click .transaction': function(e){
    var category = $(e.target).data("category"),
        type = $(e.target).data("type"),
        name = $(e.target).data("name");

    Meteor.call("createTicket", category, type, name);
  },
  'click .category': function(e){
    Session.set('current', $(e.target).data("category"));
  }
});

/*****************************************************************************/
/* Ticketer: Helpers */
/*****************************************************************************/
Template.Ticketer.helpers({
  'current': function(){
    return Session.get("current");
  },
  'name': function(){
    if(!App.findOne()) return;

    return App.findOne().name;
  },
  'app': function(){
    return App.find().fetch()[0];
  },
  'time': function(){
    return moment(TimeSync.serverTime()).format("MM/DD/YYYY hh:mm:ss a");
  }
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
