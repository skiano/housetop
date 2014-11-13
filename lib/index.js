
var Housetop = require('./Housetop');
var _ = require('lodash');

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

house.render(1030, 10);
house.render(1000, 10);
house.render(1000, 10);

// _.each(_.range(10,1070, .35), function (w) {
//   console.log(w)
//   house.render(w, 10);
// })


