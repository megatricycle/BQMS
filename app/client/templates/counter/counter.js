/*****************************************************************************/
/* Counter: Event Handlers */
/*****************************************************************************/
Template.Counter.events({
  'click #callNext': function(){
    Meteor.call('callNext', Meteor.userId());
  },
  //sendalert,
  //putonhold,
  'click #startTransaction': function(){
    Meteor.call('startTransaction', Meteor.userId());
  },
  'click #endTransaction': function(){
    Meteor.call('endTransaction', Meteor.userId());
  }
});

/*****************************************************************************/
/* Counter: Helpers */
/*****************************************************************************/
Template.Counter.helpers({
  'app': function(){
    return App.find().fetch()[0];
  },
  'time': function(){
    return moment(TimeSync.serverTime()).format("MM/DD/YYYY hh:mm:ss a");
  },
  'user': function(){
    return Meteor.user();
  },
  'callNextDisabled': function(){
    if(!Meteor.user()){
      return;
    }

    return Queue.find().count() == 0? "disabled": Meteor.user().profile.currently_serving? "disabled": "";
  },
  'putOnHoldDisabled': function(){
    if(!Meteor.user()){
      return;
    }

    return !Meteor.user().profile.currently_serving? "disabled": Meteor.user().profile.on_transaction? "disabled": "";
  },
  'startTransactionDisabled': function(){
    if(!Meteor.user()){
      return;
    }

    return !Meteor.user().profile.currently_serving? "disabled": Meteor.user().profile.on_transaction? "disabled": "";
  },
  'endTransactionDisabled': function(){
    if(!Meteor.user()){
      return;
    }

    return !Meteor.user().profile.currently_serving? "disabled": Meteor.user().profile.on_transaction? "": "disabled";
  },
  'servingTicketDisabled': function(){
    if(!Meteor.user()){
      return;
    }

    return Meteor.user().profile.currently_serving? "": "disabled";
  }
});

/*****************************************************************************/
/* Counter: Lifecycle Hooks */
/*****************************************************************************/
Template.Counter.created = function () {
};

Template.Counter.rendered = function () {
};

Template.Counter.destroyed = function () {
};
