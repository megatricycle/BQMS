Meteor.startup(function () {
  //start decrementing countdowns
  Meteor.call('countdowns');

  //insert data seeding here if required fields are empty
  if(App.find().count() == 0){
    App.insert({
      name: "Test name",
      next_ticket: 0
    });
  }

  if(Meteor.users.find().count() == 0){
    Accounts.createUser({
      username: "admin",
      password: "admin",
      profile: {
        type: "admin"
      }
    });

    Accounts.createUser({
      username: "view",
      password: "view",
      profile: {
        type: "view"
      }
    });

    Accounts.createUser({
      username: "supervisor",
      password: "supervisor",
      profile: {
        type: "supervisor"
      }
    });

    Accounts.createUser({
      username: "ticketer",
      password: "ticketer",
      profile: {
        type: "ticketer"
      }
    });

  }

  //set up global variables here
  branch = App.findOne().name;
});
