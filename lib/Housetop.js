
var _ = require('lodash');
var m = require('./math');
var constants = require('./constants');
var AXIS = constants.AXIS;
var PLACE = constants.PLACE;
var DIMENSION = constants.DIMENSION;


module.exports = Housetop;

function Housetop (options) {

  var options = _.extend({
    width: 1000, 
    gutter: 20
  }, options);

  this.addMaterial = function (patches, axis, placement) {

    var comboPatch = m.fitPatches(patches, 'w', {x:2,g:2})

    console.log(comboPatch.patches)
    return this;
  }

  return this;
}

var p = Housetop.prototype;

p.base = function (patches, axis) {
  axis = axis || AXIS.X;
  return this.addMaterial(patches, axis);
}

p.top = function (patches) {
  return this.addMaterial(patches, AXIS.X, PLACE.TOP);
}

p.bottom = function (patches) {
  return this.addMaterial(patches, AXIS.X, PLACE.BOTTOM);
}

p.left = function (patches) {
  return this.addMaterial(patches, AXIS.X, PLACE.LEFT);
}

p.left = function (patches) {
  return this.addMaterial(patches, AXIS.X, PLACE.LEFT);
}




