Router.configure({
  layoutTemplate: 'MasterLayout',
  loadingTemplate: 'Loading',
  notFoundTemplate: 'NotFound'
});

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