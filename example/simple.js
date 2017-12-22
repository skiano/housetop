
var _ = require('lodash');
var housetop = require('../lib');
var prettyPrint = require('../lib/debug').prettyPrint;

// As 

var house1 = housetop();

house1.base([
        {w:300,h:300}
      ])
      .top([
        {w:200,h:300}, 
        {w:200,h:300}
      ])
      .left([
        {w:200,h:300}
      ])
      .bottom([
        {w:200,h:300},
        {w:200,h:300},
        {w:200,h:300},
        {w:200,h:300}
      ])

prettyPrint(house1.render(1030, 10));

// ----------------------------------------------------

var house2 = housetop();

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

// ----------------------------------------------------

var house3 = housetop();

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

// ----------------------------------------------------


var house = housetop();

house.supply([
  {w:200,h:300},
  {w:200,h:300},
  {w:200,h:300},
  {w:200,h:300},
  {w:200,h:300},
  {w:200,h:300}
]).plan([
  ['base', {w:200,h:300}],
  ['top', 2],
  ['top', 1]
]);

console.log(house.render(1030, 10))

prettyPrint(house.render(1030, 10));

