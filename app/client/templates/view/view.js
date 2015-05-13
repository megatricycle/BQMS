/*****************************************************************************/
/* View: Event Handlers */
/*****************************************************************************/
Template.View.events({
});

/*****************************************************************************/
/* View: Helpers */
/*****************************************************************************/
Template.View.helpers({
  'counter': function(){
    return Meteor.users.find({"profile.type": "counter"}, {
      "profile.id": 1,
      "profile.currently_serving": 1
    });
  },
  'app': function(){
    return App.find().fetch()[0];
  },
  'time': function(){
    return moment(TimeSync.serverTime()).format("MM/DD/YYYY hh:mm:ss a");
  }
});

/*****************************************************************************/
/* View: Lifecycle Hooks */
/*****************************************************************************/
Template.View.created = function () {
};

Template.View.rendered = function () {

    console.log($("#message-container").width());

    $('.marquee-item').each(function(i) {
      // var prevWidth = 0;

      // $(this).css("left", (i * $("#message-container")[0].clientWidth + prevWidth) + "px");



      // prevWidth += $(this).width();
    });
};

Template.View.destroyed = function () {
};
