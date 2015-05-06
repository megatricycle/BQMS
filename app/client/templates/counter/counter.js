/*****************************************************************************/
/* Counter: Event Handlers */
/*****************************************************************************/
Template.Counter.events({
  'click #callNext': function(){
    Meteor.call('callNext', Meteor.userId());
  },
  'click #sendAlert': function(){
    Meteor.call('sendAlert', Meteor.userId());
  },
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
  'serviceTime': function(){
    if(!Meteor.user()) return;

    if(!Meteor.user().profile.on_transaction) return "00:00";

    //current time - start_transaction time
    var time = moment(moment(TimeSync.serverTime()) - moment(Meteor.user().profile.currently_serving.start_transaction));

    return time.format("mm:ss");
  },
  //all helpers below are for disabling buttons
  'callNextDisabled': function(){
    if(!Meteor.user()){
      return;
    }

    if(Queue.find().count() == 0) return "disabled";

    if(Meteor.user().profile.currently_serving) return "disabled";

    return "";
  },
  'putOnHoldDisabled': function(){
    if(!Meteor.user()){
      return;
    }

    if(!Meteor.user().profile.currently_serving) return "disabled";

    if(Meteor.user().profile.on_transaction) return "disabled";

    if(Meteor.user().profile.put_on_hold_countdown > 0) return "disabled";

    if(Meteor.user().profile.currently_serving.times_called >= 3) return "disabled";

    return "";
  },
  'noShowDisabled': function(){
    if(!Meteor.user()){
      return;
    }

    if(!Meteor.user().profile.currently_serving) return "disabled";

    if(Meteor.user().profile.put_on_hold_countdown > 0) return "disabled";

    if(Meteor.user().profile.currently_serving && Meteor.user().profile.on_transaction) return "disabled";

    return "";
  },
  'startTransactionDisabled': function(){
    if(!Meteor.user()){
      return;
    }

    if(!Meteor.user().profile.currently_serving) return "disabled";

    if(Meteor.user().profile.on_transaction) return "disabled";

    return "";
  },
  'endTransactionDisabled': function(){
    if(!Meteor.user()){
      return;
    }

    if(!Meteor.user().profile.currently_serving) return "disabled";

    if(!Meteor.user().profile.on_transaction) return "disabled";

    return "";
  },
  'servingTicketDisabled': function(){
    if(!Meteor.user()){
      return;
    }

    if(!Meteor.user().profile.currently_serving) return "disabled";

    return "";
  },
  'ticketOnHoldDisabled': function(){
    if(!Meteor.user()){
      return;
    }

    if(Meteor.user().profile.currently_serving) return "disabled";

    return "";
  },
  'breakDisabled': function(){
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
  Tracker.autorun(function(){
    if(!Meteor.user()) return;

    Meteor.subscribe('Queue', Meteor.user().profile.privilages);
  });
};

Template.Counter.rendered = function () {
};

Template.Counter.destroyed = function () {
};
