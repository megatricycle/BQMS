//route settings

Router.configure({
  loadingTemplate: 'Loading',
  notFoundTemplate: 'NotFound'
});

//user authentication

Router.onBeforeAction(function() {
  //redirect to login page if not logged in
  
  if(!Meteor.userId()){
    Router.go('/');
  }
  else{
    this.next();
  }
},{
  except: ['home']
});

//define routes here

Router.route('/', {
  name: 'home',
  controller: 'HomeController',
  action: 'action',
  where: 'client'
});

Router.route('ticketer', {
  name: 'ticketer',
  controller: 'TicketerController',
  action: 'action',
  where: 'client'
});

Router.route('counter', {
  name: 'counter',
  controller: 'CounterController',
  action: 'action',
  where: 'client'
});

Router.route('view', {
  name: 'view',
  controller: 'ViewController',
  action: 'action',
  where: 'client'
});

Router.route('supervisor', {
  name: 'supervisor',
  controller: 'SupervisorController',
  action: 'action',
  where: 'client'
});

Router.route('admin', {
  name: 'admin',
  controller: 'AdminController',
  action: 'action',
  where: 'client'
});
