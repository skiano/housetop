
var _ = require('lodash');
var $ = require('./library');
var constants = require('./constants');
var PLACE = constants.PLACE;
var DIMENSION = constants.DIMENSION;


module.exports = Housetop;

function Housetop (options) {

  var options = _.extend({
    width: 1000, 
    gutter: 20,
    baseOrientation: 'horizontal' 
  }, options);

  this.addMaterial = function (patches, placement) {

    var comboPatch = $.fitPatches(patches, 'w', {x:2,g:2})

    console.log(comboPatch.patches)
    return this;
  }

  return this;
}

var p = Housetop.prototype;

p.base = function (patches) {
  var placement = (this.baseOrientation === 'horizontal') ? 
                    PLACE.bottom : PLACE.right;
  return this.addMaterial(patches, placement);
}

p.top = function (patches) {
  return this.addMaterial(patches, PLACE.top);
}

p.bottom = function (patches) {
  return this.addMaterial(patches, PLACE.bottom);
}

p.left = function (patches) {
  return this.addMaterial(patches, PLACE.left);
}

p.left = function (patches) {
  return this.addMaterial(patches, PLACE.right);
}




