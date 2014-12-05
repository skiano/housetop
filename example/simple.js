
var _ = require('lodash');
var housetop = require('../lib');
var prettyPrint = require('../lib/debug').prettyPrint;

// As 

var house1 = housetop();

house1.base([
        {w:300,h:300},
        {w:300,h:300}
      ])
      .right([
        {w:200,h:300}, 
        {w:200,h:300}
      ])
      .top([
        {w:200,h:300}
      ])
      .bottom([
        {w:200,h:300},
        {w:200,h:300},
        {w:200,h:300},
        {w:200,h:300}
      ])

var patches = house1.render(1030, 10);

console.log('----------')
console.log(patches)

// prettyPrint();

// // ----------------------------------------------------

// var house2 = housetop();

// house2.supply([
//   {w:200,h:300},
//   {w:200,h:300},
//   {w:200,h:300},
//   {w:200,h:300},
//   {w:200,h:300},
//   {w:200,h:300},
//   {w:200,h:300}
// ]).plan([
//   ['base', 1],
//   ['top', 2],
//   ['left', 1],
//   ['bottom', 4]
// ]);

// prettyPrint(house2.render(1030, 10));

// // ----------------------------------------------------

// var house3 = housetop();

// house3.supply([
//   {w:200,h:300},
//   {w:200,h:300},
//   {w:200,h:300},
//   {w:200,h:300},
//   {w:200,h:300},
//   {w:200,h:300}
// ]).plan([
//   ['base', {w:200,h:300}],
//   ['top', 2],
//   ['left', 1],
//   ['bottom', 4]
// ]);

// prettyPrint(house3.render(1030, 10));

// // ----------------------------------------------------

// var house4 = housetop({
//   initialPatch: {"orientation":"vertical","patches":[{"orientation":"horizontal","patches":[{"h":{"x":2.25,"g":0.25},"w":{"x":1.5,"g":0.16666667},"patches":[{"w":{"x":1.5,"g":0.16666667},"h":{"x":2.25,"g":0.25}}],"orientation":"vertical"},{"orientation":"vertical","patches":[{"w":{"x":1,"g":0},"h":{"x":0.75,"g":-0.75},"patches":[{"w":{"x":0.5,"g":-0.5},"h":{"x":0.75,"g":-0.75}},{"w":{"x":0.5,"g":-0.5},"h":{"x":0.75,"g":-0.75}}],"orientation":"horizontal"},{"w":{"x":1,"g":0},"h":{"x":1.5,"g":0},"patches":[{"w":{"x":1,"g":0},"h":{"x":1.5,"g":0}}],"orientation":"horizontal"}],"h":{"x":2.25,"g":0.25},"w":{"x":1,"g":0}}],"w":{"x":2.5,"g":1.16666667},"h":{"x":2.25,"g":0.25}},{"w":{"x":2.5,"g":1.16666667},"h":{"x":1.25,"g":-0.41666667},"patches":[{"w":{"x":0.83333333,"g":-0.27777778},"h":{"x":1.25,"g":-0.41666667}},{"w":{"x":0.83333333,"g":-0.27777778},"h":{"x":1.25,"g":-0.41666667}},{"w":{"x":0.83333333,"g":-0.27777778},"h":{"x":1.25,"g":-0.41666667}}],"orientation":"horizontal"}],"h":{"x":3.5,"g":0.83333333},"w":{"x":2.5,"g":1.16666667}}
// });

// prettyPrint(house4.render(1030, 10));

// // ----------------------------------------------------


// var house = housetop();

// house.supply([
//   {w:200,h:300},
//   {w:200,h:300},
//   {w:200,h:300},
//   {w:200,h:300},
//   {w:200,h:300},
//   {w:200,h:300}
// ]).plan([
//   ['base', {w:200,h:300}],
//   ['top', 2],
//   ['top', 1]
// ]);

// prettyPrint(house.render(1030, 10));

