Template.MasterLayout.helpers({
});

Template.MasterLayout.events({
  'click #logout': function(){
    Meteor.logout();
  }
});
