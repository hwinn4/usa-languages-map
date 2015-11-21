$(function(){

     var width = 960,
        height = 500;

    var svg = d3.select("body").append("svg")
            .attr("width", width)
            .attr("height", height);

    var path = d3.geo.path();

    var color = d3.scale.category20b();

    var g = svg.append("g");

    var stateColors = {};



    // path data
    d3.json("assets/us.json", function(unitedState) {
      var num = 0;
      var data = topojson.feature(unitedState, unitedState.objects.states).features;
      neighbors = topojson.neighbors(unitedState.objects.states.geometries);
      // our names
      d3.tsv("assets/us-state-names.tsv", function(tsv){
        // create hash of the names and ids
        var names = {};
        tsv.forEach(function(d,i){
          // uses the names hash from the tsv file
          names[d.id] = d.name;
        });


    // build paths
    g.append("g")
      .attr("class", "states-bundle")
      .selectAll("path")
      .data(data)
      .enter()
      .append("path")
      .attr("id", (function(d){
        // d is the json file
        for (var i = 0; i < 53; i++){
          return names[d.id];
        }

      }))
      .attr("d", path)
      .style("fill", "black")
      .attr("stroke", "white")
      .attr("class", "states")
      .on('click', function(){
        $('.state_name').text(this.id);
        stateInfo(this.id);
        var persisted = $(this).attr('style').split(": ")[1];
        $('path[style]').css('fill', 'black');
        $(this).css('fill', 'cyan');
        });

    // add state names
     // g.append("g")
     //  .attr("class", "states-names")
     //  .selectAll("text")
     //  .data(data)
     //  .enter()
     //  .append("svg:text")
      // .text(function(d){
      //   // debugger;
      //   return names[d.id];
      // })
      // .attr("x", function(d){
      //     return path.centroid(d)[0];
      // })
      // .attr("y", function(d){
      //     return  path.centroid(d)[1];
      // })
      // .attr("text-anchor","middle")
      // .attr('fill', 'white');
         })
     })


});

// END MAP

// LISTENERS

$(function(){
  $('.state_name').click(function(){
    var stateId = $(this).text();
    var selector = "#" + stateId;
    // $(this).css("fill", "cyan");
  });

});

function stateInfo(stateName) {
    $.getJSON('assets/json/sample-data.json', function(data) {
      var items = "";
      $.each(data, function(key, val) {
        items += "<li id='" + key + "'>" + key + ": " + val + "</li>";
        });
      $('.state_languages').append(items);
    });
  }
