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

  }
});
