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
      var dataset = [5, 10, 15, 20, 25, 11, 25, 22, 18, 7];
      var numberOfElements = dataset.length;
      var heightOfLargestElement = _.max(dataset) * 4;
      var topPadding = 30;
      var w = 300;
      var h = heightOfLargestElement + topPadding;
      var padding = 2;
      var svg = d3.select('#d3').append('svg')
        .attr('width', w).attr('height', h);

      svg.selectAll('rect')
        .data(dataset).enter()
        .append('rect')
        //pass an array of values instead of chaining attr methods
        .attr({
          x: function(d, i) {
            return i * (w / numberOfElements);
          },
          y: function(d, i) {
            return h - d * 4;
          },
          width: w / numberOfElements - padding,
          height: function(d) {
            return d * 4;
          },
          fill: function(d) {
            return colorPicker(d);
          }
        });

      svg.selectAll('text')
        .data(dataset)
        .enter()
        .append('text')
        .text(function(d) {
          return d;
        })
        .attr({
          'text-anchor': 'middle',
          x: function(data, idx) {
            return idx * (w / numberOfElements) + (w / numberOfElements - padding) / 2;
          },
          y: function(data) {
            return h - (data * 4) + 14;
          },
          "font-family": 'sans-serif',
          "font-size": 12,
          "fill": "#ffffff"
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
