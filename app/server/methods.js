/*****************************************************************************/
/* Server Only Methods */
/*****************************************************************************/
Meteor.methods({
  'createTicket': function(category, type, name){
    console.log("Creating new ticket..");
    console.log("Category: "+category);
    console.log("Type: "+type);
    console.log("Name: "+name);
  }
});
