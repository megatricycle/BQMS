Meteor.startup(function () {
  
  //insert data seeding here if required fields are empty
  if(App.find().count() == 0){
    App.insert({
      name: "Test name",
      nextTicket: 0
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
});
