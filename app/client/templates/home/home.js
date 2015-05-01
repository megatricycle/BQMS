/*****************************************************************************/
/* Home: Event Handlers */
/*****************************************************************************/
Template.Home.events({
  'submit #login-form': function(e, data){
    e.preventDefault();

    var username = data.find("#login-username").value,
        password = data.find("#login-password").value;

    //validate if wanted

    Meteor.loginWithPassword(username, password, function(err){
      if(err){
        //incorrect
        alert("Incorrect!");
      }
      else{
        location.reload(true);
      }
    });

    return false;
  }
});

/*****************************************************************************/
/* Home: Helpers */
/*****************************************************************************/
Template.Home.helpers({
});

/*****************************************************************************/
/* Home: Lifecycle Hooks */
/*****************************************************************************/
Template.Home.created = function () {
};

Template.Home.rendered = function () {
};

Template.Home.destroyed = function () {
};
