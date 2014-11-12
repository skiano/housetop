
var Housetop = require('./Housetop');

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
  .finish(1030, 10);


