/*****************************************************************************/
/* Server Only Methods */
/*****************************************************************************/

Meteor.methods({
  'createTicket': function(category, type, name){
    var number = App.findOne().next_ticket.ticketFormat();

    console.log("Creating new ticket ("+category+","+type+","+name+","+branch+","+number+")");

    //insert the ticket to the db
    Queue.insert({
      category: category,
      type: type,
      name: name,
      ticket_number: number,
      branch: branch,
      issued_on: new Date()
    });

    //update next ticket number
    if(number >= 9999){
      App.update({}, {
        $set: {
          next_ticket: 0
        }
      });
    }
    else{
      App.update({}, {
        $inc: {
          next_ticket: 1
        }
      });
    }
  },
  'newUser': function(username, password, type, id, msr, privilages){
    //@TODO: perform some validation here

    if(type == "counter"){
      Accounts.createUser({
        username: username,
        password: password,
        profile: {
          type: type,
          id: id,
          msr: msr,
          privilages: privilages,
          currently_serving: null,
          tickets_on_hold: [],
          idle_time: 0,
          on_transaction: false,
          break_mode: false
        }
      });
    }
    else{
      Accounts.createUser({
        username: username,
        password: password,
        profile: {
          type: type
        }
      });
    }
  },
  'callNext': function(id){
    var counter = Meteor.users.findOne({_id: id}),
        nextTicket = Queue.find({category: {$in: counter.profile.privilages}}).fetch()[0];

    //set that ticket to user's currently serving
    Meteor.users.update({
      _id: id
    },{
      $set: {
        "profile.currently_serving": nextTicket,

      }
    });

    Meteor.users.update({
      _id: id
    },{
      $set: {
        "profile.currently_serving.served_on": new Date(),
        "profile.currently_serving.times_called": 1
      }
    });

    //remove that ticket from the queue
    Queue.remove({_id: nextTicket._id});

    console.log(counter.profile.id+" called ticket "+nextTicket.ticket_number);
  },
  'putOnHold': function(id){
    var ticket = Meteor.users.findOne({_id: id}, {"profile.currently_serving": 1}).profile.currently_serving;

    Meteor.users.update({_id: id}, {
      $push: {
        "profile.tickets_on_hold": ticket
      },
      $set: {
        "profile.currently_serving": null
      }
    });
  },
  'noShow': function(id){
    var msr = Meteor.users.findOne({_id: id},{"profile.currently_serving": 1}).profile.msr;

    //set no show flag and set on_transaction to false
    Meteor.users.update({
      _id: id
    },{
      $set: {
        "profile.currently_serving.no_show": true,
        "profile.currently_serving.msr": msr,
        "profile.on_transaction": false
      }
    });

    var ticket = Meteor.users.findOne({_id: id},{"profile.currently_serving": 1}).profile.currently_serving;

    Meteor.users.update({
      _id: id
    },{
      $set: {
        "profile.currently_serving": null
      }
    });

    Ticket.insert(ticket);
  },
  'startTransaction': function(id){
    //@TODO: some validation here

    //set start transaction timestamp on currently serving ticket and set on_transaction to true
    Meteor.users.update({
      _id: id
    },{
      $set: {
        "profile.currently_serving.start_transaction": new Date(),
        "profile.on_transaction": true
      }
    });
  },
  'endTransaction': function(id){
    //@TODO: some validation here

    var msr = Meteor.users.findOne({_id: id},{"profile.currently_serving": 1}).profile.msr;

    //set end transaction timestamp on currently serving ticket and set on_transaction to false
    Meteor.users.update({
      _id: id
    },{
      $set: {
        "profile.currently_serving.end_transaction": new Date(),
        "profile.currently_serving.msr": msr,
        "profile.on_transaction": false
      }
    });

    var ticket = Meteor.users.findOne({_id: id},{"profile.currently_serving": 1}).profile.currently_serving;

    Meteor.users.update({
      _id: id
    },{
      $set: {
        "profile.currently_serving": null
      }
    });

    Ticket.insert(ticket);
  },
  'ticketCall': function(id, ticketId){
    var ticket = Meteor.users.findOne({_id: id}, {
      "profile.tickets_on_hold": {
        $elemMatch: {
          _id: ticket
        }
      }
    }).profile.tickets_on_hold[0];

    ticket.times_called++

    Meteor.users.update({_id: id}, {
      $pull: {
        "profile.tickets_on_hold": {
          _id: ticketId
        }
      },
      $set: {
        "profile.currently_serving": ticket
      }
    });
  },
});
