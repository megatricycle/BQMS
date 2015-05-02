/*****************************************************************************/
/* Counter: Event Handlers */
/*****************************************************************************/
Template.Counter.events({
  'click #callNext': function(){
    Meteor.call('callNext', Meteor.userId());
  },
  //sendalert,
  'click #putOnHold': function(){
    Meteor.call('putOnHold', Meteor.userId());
  },
  'click #noShow': function(){
    Meteor.call('noShow', Meteor.userId());
  },
  'click #startTransaction': function(){
    Meteor.call('startTransaction', Meteor.userId());
  },
  'click #endTransaction': function(){
    Meteor.call('endTransaction', Meteor.userId());
  },
  'click .ticket-call': function(e){
    Meteor.call('ticketCall', Meteor.userId(), $(e.target).data("ticket"));
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

    if(!Meteor.user().profile.currently_serving) return "disabled";

    if(Meteor.user().profile.on_transaction) return "disabled";

    if(Meteor.user().profile.currently_serving.times_called >= 3) return "disabled";

    return "";
  },
  'noShowDisabled': function(){
    if(!Meteor.user()){
      return;
    }

    if(!Meteor.user().profile.currently_serving) return "disabled";

    if(Meteor.user().profile.currently_serving && Meteor.user().profile.on_transaction) return "disabled";

    return "";
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
  },
  'ticketOnHoldDisabled': function(){
    if(!Meteor.user()){
      return;
    }

    if(Meteor.user().profile.currently_serving) return "disabled";

    return "";
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
