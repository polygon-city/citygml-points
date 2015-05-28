# CityGML Points

Retrieve gml:PosList and gml:Pos values from a given XML string

## Usage

```javascript
var citygmlPoints = require("citygml-points");

var xml = "..."; // Some CityGML
var points = citygmlPoints(xml); // [[x,y,z], [...]]
```
