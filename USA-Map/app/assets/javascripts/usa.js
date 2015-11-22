$(function(){

     var width = 960,
        height = 500;

    var svg = d3.select("body").append("svg")
            .attr("width", width)
            .attr("height", height);

    var path = d3.geo.path();

    var color = d3.scale.category20b();

    var g = svg.append("g");



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
      .style("fill", function(d, i) { return color(d.color = d3.max(neighbors[i], function(n) { return data[n].color; }) + 1 | 0); })
      .attr("stroke", "white")
      .attr("class", "states")
      .on('click', function(){
        $('.state_name').text(this.id);
        stateInfo(this.id);
        $(this).css("fill", "cyan");
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
    var selector = "#" + stateId
    $(selector).css("fill", "cyan");
  });

});

function stateInfo(stateName) {
    $.getJSON('states/' + stateName + '.json', function(data) {
      var stateLanguage = "";
      var stateLanguageStatistics = "";
      stateLanguage += "<h3 class='" + " - " + data.language1 + "</h3>"
      stateLanguageStatistics += "<li id='" + data.name + "'>" + data.language1 + ": " + data.speakers1 + "</li>";
      stateLanguageStatistics += "<li id='" + data.name + "'>" + data.language2 + ": " + data.speakers2 + "</li>";
      $('.state_name').append(stateLanguage);
      $('.state_language_statistics').html(stateLanguageStatistics);
    });
  }
