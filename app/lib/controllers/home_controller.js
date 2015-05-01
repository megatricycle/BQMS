HomeController = RouteController.extend({
  subscriptions: function() {
  },

  action: function() {
    if(Meteor.user()){
      switch(Meteor.user().profile.type){
        case 'admin':
          Router.go('admin');
          break;
        case 'supervisor':
          Router.go('supervisor');
          break;
        case 'view':
          Router.go('view');
          break;
        case 'counter':
          Router.go('counter');
          break;
        default:
          this.render('Home');
      }
    }
    else{
      this.render('Home');
    }
  }
});
