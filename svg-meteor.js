if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault('counter', 0);

  Template.hello.onRendered(
    function() {
      let dataset = _.range(5, 30, 5);
      let w = 300;
      let h = _.max(dataset) * 4;
      let padding = 2;
      let svg = d3.select('#d3').append('svg')
        .attr('width', w).attr('height', h);

      svg.selectAll('rect')
        .data(dataset).enter()
        .append('rect')
        .attr('x', function(d, i) {
          return i * (w / dataset.length);
        })
        .attr('y', function(d, i) {
          return h - d * 4;
        })
        .attr('width', w / dataset.length - padding)
        .attr('height', function(d) {
          return d * 4;
        })
        .attr('fill', function(d){
          return 'rgb(' + (d*10) +',0,0)';
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
