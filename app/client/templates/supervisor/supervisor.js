/*****************************************************************************/
/* Supervisor: Event Handlers */
/*****************************************************************************/
Template.Supervisor.events({
  'click #queueStatus': function(){
    Session.set("current", "QueueStatus");
  },
  'click #counterAssignments': function(){
    Session.set("current", "CounterAssignments");
  },
});

Template.CounterAssignments.events({
  'submit #create-counter': function(e){
    e.preventDefault();

    var username = $("#create-counter").find("#create-counter-username").val(),
        password = $("#create-counter").find("#create-counter-password").val(),
        id = $("#create-counter").find("#create-counter-id").val(),
        msr = $("#create-counter").find("#create-counter-MSR").val(),
        privilages = [];

      //select all privilages
      $("#create-counter").find("input:checked").each(function(){
        privilages.push(this.value);
      });

    Meteor.call('newUser', username, password, "counter", id, msr, privilages);

    $("#create-counter")[0].reset();
  },
  'submit #edit-counter': function(e){
    e.preventDefault();

    var id = $("#edit-counter").find("#edit-counter-id").val(),
        msr = $("#edit-counter").find("#edit-counter-MSR").val(),
        privilages = [];

      //select all privilages
      $("#edit-counter").find("input:checked").each(function(){
        privilages.push(this.value);
      });

    Meteor.call('editCounter', this._id, id, msr, privilages);

    Session.set('selected', null);
  },
  'click .edit-btn': function(){
    Session.set('selected', this.username);
  },
  'click .delete-btn': function(){
    Meteor.call("removeUser", this._id);
  }
});

/*****************************************************************************/
/* Supervisor: Helpers */
/*****************************************************************************/
Template.Supervisor.helpers({
  'current': function(){
    return Session.get("current");
  },
  'app': function(){
    return App.find().fetch()[0];
  },
  'time': function(){
    return moment(TimeSync.serverTime()).format("MM/DD/YYYY hh:mm:ss a");
  }
});

Template.QueueStatus.helpers({
  'queue': function(){
    var a = Queue.find({category: "Type A"}).count(),
        b = Queue.find({category: "Type B"}).count(),
        c = Queue.find({category: "Type C"}).count(),
        d = Queue.find({category: "Type D"}).count(),
        e = Queue.find({category: "Type E"}).count();

    return {a: a, b: b, c: c, d: d, e: e};
  }
});

Template.CounterAssignments.helpers({
  'selected': function(id){
    return Session.get('selected') == id? true: false;
  },
  'counters': function(){
    return Meteor.users.find({'profile.type': 'counter'}, {$sort: {createdAt: 1}});
  },
  'isChecked': function(privilages, category){
    return privilages.indexOf(category) == -1? '': "checked";
  }
});

/*****************************************************************************/
/* Supervisor: Lifecycle Hooks */
/*****************************************************************************/
Template.Supervisor.created = function () {
  Session.set('current', "QueueStatus");
};

Template.Supervisor.rendered = function () {

};

Template.QueueStatus.rendered = function() {
  Deps.autorun(function(){
    var a = Queue.find({category: "Type A"}).count(),
        b = Queue.find({category: "Type B"}).count(),
        c = Queue.find({category: "Type C"}).count(),
        d = Queue.find({category: "Type D"}).count(),
        e = Queue.find({category: "Type E"}).count();

    var data = [{type: "Type A", count: a}, {type: "Type B", count: b}, {type: "Type C", count: c}, {type: "Type D", count: d}, {type: "Type E", count: e}];

    console.log(data);

    //clear existing chart if any
    $(".chart").children("svg").remove();

    var valueLabelWidth = 60; // space reserved for value labels (right)
    var barHeight = 30; // height of one bar
    var barLabelWidth = 100; // space reserved for bar labels
    var barLabelPadding = 5; // padding between bar and bar labels (left)
    var gridLabelHeight = 18; // space reserved for gridline labels
    var gridChartOffset = 3; // space between start of grid and first bar
    var maxBarWidth = 900; // width of the bar with the max value

    // accessor functions
    var barLabel = function(d) { return d['type']; };
    var barValue = function(d) { return parseFloat(d['count']); };

    // scales
    var yScale = d3.scale.ordinal().domain(d3.range(0, data.length)).rangeBands([0, data.length * barHeight]);
    var y = function(d, i) { return yScale(i); };
    var yText = function(d, i) { return y(d, i) + yScale.rangeBand() / 2; };
    var x = d3.scale.linear().domain([0, 50]).range([0, maxBarWidth]);
    // svg container element
    var chart = d3.select('.chart').append("svg")
      .attr('width', maxBarWidth + barLabelWidth + valueLabelWidth)
      .attr('height', gridLabelHeight + gridChartOffset + data.length * barHeight);
    // grid line labels
    var gridContainer = chart.append('g')
      .attr('transform', 'translate(' + barLabelWidth + ',' + gridLabelHeight + ')');
    gridContainer.selectAll("text").data(x.ticks(10)).enter().append("text")
      .attr("x", x)
      .attr("dy", -3)
      .attr("text-anchor", "middle")
      .text(String);
    // vertical grid lines
    gridContainer.selectAll("line").data(x.ticks(10)).enter().append("line")
      .attr("x1", x)
      .attr("x2", x)
      .attr("y1", 0)
      .attr("y2", yScale.rangeExtent()[1] + gridChartOffset)
      .style("stroke", "#ccc");
    // bar labels
    var labelsContainer = chart.append('g')
      .attr('transform', 'translate(' + (barLabelWidth - barLabelPadding) + ',' + (gridLabelHeight + gridChartOffset) + ')');
    labelsContainer.selectAll('text').data(data).enter().append('text')
      .attr('y', yText)
      .attr('stroke', 'none')
      .attr('fill', 'black')
      .attr("dy", ".35em") // vertical-align: middle
      .attr('text-anchor', 'end')
      .text(barLabel);
    // bars
    var barsContainer = chart.append('g')
      .attr('transform', 'translate(' + barLabelWidth + ',' + (gridLabelHeight + gridChartOffset) + ')');
    barsContainer.selectAll("rect").data(data).enter().append("rect")
      .attr('y', y)
      .attr('height', yScale.rangeBand())
      .attr('width', function(d) { return x(barValue(d)); })
      .attr('stroke', 'white')
      .attr('fill', 'steelblue');
    // bar value labels
    barsContainer.selectAll("text").data(data).enter().append("text")
      .attr("x", function(d) { return x(barValue(d)); })
      .attr("y", yText)
      .attr("dx", 3) // padding-left
      .attr("dy", ".35em") // vertical-align: middle
      .attr("text-anchor", "start") // text-align: right
      .attr("fill", "black")
      .attr("stroke", "none")
      .text(function(d) { return d3.round(barValue(d), 2); });
    // start line
    barsContainer.append("line")
      .attr("y1", -gridChartOffset)
      .attr("y2", yScale.rangeExtent()[1] + gridChartOffset)
      .style("stroke", "#000");
  });
};

Template.Supervisor.destroyed = function () {
};
