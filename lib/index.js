
var Housetop = require('./Housetop');
var _ = require('lodash');

// for testing
var prettyPrint = require('./preview').prettyPrint;

var house1 = new Housetop();

house1
  .base([{w:300,h:300}])
  .top([{w:200,h:300}, {w:200,h:300}])
  .left([{w:200,h:300}])
  .bottom([
    {w:200,h:300},
    {w:200,h:300},
    {w:200,h:300},
    {w:200,h:300}
  ])

prettyPrint(house1.render(1030, 10));

var house2 = new Housetop();

house2.supply([
  {w:200,h:300},
  {w:200,h:300},
  {w:200,h:300},
  {w:200,h:300},
  {w:200,h:300},
  {w:200,h:300},
  {w:200,h:300}
]).plan([
  ['base', 1],
  ['top', 2],
  ['left', 1],
  ['bottom', 4]
]);

prettyPrint(house2.render(1030, 10));

var house3 = new Housetop();

house3.supply([
  {w:200,h:300},
  {w:200,h:300},
  {w:200,h:300},
  {w:200,h:300},
  {w:200,h:300},
  {w:200,h:300}
]).plan([
  ['base', {w:200,h:300}],
  ['top', 2],
  ['left', 1],
  ['bottom', 4]
]);

prettyPrint(house3.render(1030, 10));

// house.debug = true;
// _.each(_.range(10,1070, .35), function (w) {
//   house.render(w, 10);
// })


