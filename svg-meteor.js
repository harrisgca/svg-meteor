if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault('counter', 0);

  Template.hello.onRendered(
    function() {

      let w = 200;
      let h = 100;
      let padding = 2;
      let dataset = _.range(5, 30, 5);
      let svg = d3.select('#d3')
        .append('svg')
        .attr('width', w)
        .attr('height', h);

      svg.selectAll('rect')
        .data(dataset)
        .enter()
        .append('rect')
        .attr('x', function(d, i) {
          return i * (w / dataset.length);
        })
        .attr('y', function(d){
          return h - d;
        })
        .attr('width', w / dataset.length - padding)
        .attr('height', function(d){
          return d;
        });

      $('rect').each(function(){
        $(this).on('mouseover', function(){
          console.log("value of this", this.__data__);
        });
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
