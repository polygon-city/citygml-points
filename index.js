var _ = require("lodash");
var DOMParser = require("xmldom").DOMParser;
var domParser = new DOMParser();

var poslistRegex = /(\r\n|\n|\r|\t)+/gm;

var citygmlPoints = function(xml) {
  var points = [];

  var xmlDOM = domParser.parseFromString(xml);

  // Only retreive the first posList
  // TODO: Decide if there's a need for supporting multiple posLists
  var pointsDOM = xmlDOM.getElementsByTagName("gml:posList")[0];
  var coords;

  if (pointsDOM && pointsDOM.textContent.length > 0) {
    coords = pointsDOM.textContent.replace(poslistRegex, " ").trim().split(" ");
  } else {
    // Try gml:pos
    // This will return all gml:pos elements within a single array
    pointsDOM = xmlDOM.getElementsByTagName("gml:pos");

    if (pointsDOM.length > 0) {
      coords = [];

      _.each(pointsDOM, function(posDOM) {
        coords.push(posDOM.textContent.trim().split(" "));
      });

      coords = _.flatten(coords);
    }
  }

  // TODO: Validate coordinate count against srsDimension

  var coordCount = coords.length;
  for (var i = 0; i < coordCount / 3; i++) {
    var index = i * 3;

    // [x, y, alt]
    points.push([Number(coords[index]), Number(coords[index + 1]), Number(coords[index + 2])]);
  }

  return points;
};

module.exports = citygmlPoints;
