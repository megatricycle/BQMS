/**
 * Meteor.publish('items', function (param1, param2) {
 *  this.ready();
 * });
 */


Meteor.publish('Ticket', function (/* args */) {
  return Ticket.find();
});

Meteor.publish('Counter', function (/* args */) {
  return Counter.find();
});

Meteor.publish('Queue', function () {
  if(!this.userId){
    this.ready();
    return;
  }

  var privilages = Meteor.users.findOne({_id: this.userId}).profile.privilages;

  return Queue.find({category: {$in: privilages}});
});

Meteor.publish('App', function (/* args */) {
  return App.find();
});

Meteor.publish('FlashMessage', function (/* args */) {
  return FlashMessage.find();
});

Meteor.publish('Video', function (/* args */) {
  return Video.find();
});

Meteor.publish('Users', function(){
  return Meteor.users.find();
});
