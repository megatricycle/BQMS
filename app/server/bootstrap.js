Meteor.startup(function () {
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
  }

  //set up global variables here
  branch = App.findOne().name;
});
