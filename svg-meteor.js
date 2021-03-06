if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault('counter', 0);

  var colorPicker = function(value) {
    if (value <= 20) {
      return '#666666';
    } else if (value > 20) {
      return '#ff0033';
    }
  };

  Template.hello.onRendered(
    function() {
      var h = 350;
      var w = 400;

      // var monthlySales = [
      //   {month: 10, sales: 20},
      //   {month: 20, sales: 14},
      //   {month: 30, sales: 20},
      //   {month: 40, sales: 21},
      //   {month: 50, sales: 15},
      //   {month: 60, sales: 22},
      //   {month: 70, sales: 9},
      //   {month: 80, sales: 6},
      //   {month: 90, sales: 23},
      //   {month: 100, sales: 7},
      // ];

      var monthlySales = [
        {month: 10, sales: 100},
        {month: 20, sales: 130},
        {month: 30, sales: 250},
        {month: 40, sales: 300},
        {month: 50, sales: 265},
        {month: 60, sales: 225},
        {month: 70, sales: 180},
        {month: 80, sales: 120},
        {month: 90, sales: 145},
        {month: 100, sales: 130}
      ];

      var lineFun = d3.svg.line()
        .x(function(d) {
          return d.month * 3;
        })
        .y(function(d) {
          return h - d.sales;
        })
        .interpolate('linear');

      var svg = d3.select('#d3').append('svg').attr({
        width: w,
        height: h
      });

      var viz = svg.append('path')
        .attr({
          d:lineFun(monthlySales),
          "stroke": "purple",
          "stroke-width": 2,
          "fill": "none"
        });

      //add labels
      var labels = svg.selectAll('text')
        .data(monthlySales)
        .enter()
        .append('text')
        .text(function(d){ return d.sales; })
        .attr({
          x: function(d){ return d.month*3 - 25;},
          y: function(d){ return h - d.sales;},
          "font-size": "12px",
          "fill": "#666666",
          "text-anchor": "start",
          "dy": ".35em",
          "font-weight": function(d, i){
            if (i===0 || i===(monthlySales.length-1)) {
              return "bold";
            }else {
              return "normal";
            }
          }
        });
    }

  );

  Template.hello.helpers({
    counter: function() {
      return Session.get('counter');
    }
  });

  Template.hello.events({
    'click button': function() {
      // increment the counter when button is clicked
      Session.set('counter', Session.get('counter') + 1);
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function() {
    // code to run on server at startup
  });
}
