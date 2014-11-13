
var Housetop = require('./Housetop');
var _ = require('lodash');

// for testing
var prettyPrint = require('./preview').prettyPrint;

var house = new Housetop();

house
  .base([{w:300,h:300}])
  .top([{w:200,h:300}, {w:200,h:300}])
  .left([{w:200,h:300}])
  .bottom([
    {w:200,h:300},
    {w:200,h:300},
    {w:200,h:300},
    {w:200,h:300}
  ])

var house = new Housetop();

house.supply([
  {w:300,h:300},
  {w:200,h:300},
  {w:200,h:300},
  {w:200,h:300},
  {w:200,h:300},
  {w:200,h:300},
  {w:200,h:300},
  {w:200,h:300}
]);

house.plan([
  ['base', 1],
  ['top', 2],
  ['left', 1],
  ['bottom', 4]
]);

prettyPrint(house.render(100, 10));

// house.debug = true;
// _.each(_.range(10,1070, .35), function (w) {
//   house.render(w, 10);
// })


