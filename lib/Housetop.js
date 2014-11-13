
var _ = require('lodash');
var $ = require('./library');
var constants = require('./constants');
var PLACE = constants.PLACE;
var DIMENSION = constants.DIMENSION;
var TARGET_DIMENSION = constants.TARGET_DIMENSION;
var ORIENTATION = constants.ORIENTATION;

// for testing
var prettyPrint = require('./preview').prettyPrint;

module.exports = Housetop;

function Housetop (options) {

  var options = _.extend({
    baseOrientation: 'horizontal' 
  }, options);

  var finalPatch = null;
  var rootSize = {x:1,g:0};

  var self = this;
  function addMaterial (patches, placement) {
    
    var targetDimension = TARGET_DIMENSION[placement];
    var targetSize = finalPatch ? finalPatch[targetDimension] : rootSize;
    var workingPatch = $.fitPatches(patches, targetDimension, targetSize);

    finalPatch = finalPatch ? 
                  $.combinePatch(finalPatch, workingPatch, placement) : 
                  workingPatch;
    return self;
  }

  this.base = function (patches) {
    var placement = (this.baseOrientation === 'horizontal') ? 
                      PLACE.right : PLACE.bottom;
    return addMaterial(patches, placement);
  }

  this.top = _.partialRight(addMaterial, PLACE.top);
  this.bottom = _.partialRight(addMaterial, PLACE.bottom);
  this.left = _.partialRight(addMaterial, PLACE.left);
  this.right = _.partialRight(addMaterial, PLACE.right);

  this.finish = function (knownSize, gutterWidth, knownDimension) {
    knownDimension = knownDimension || DIMENSION.w;
    var x = $.solveForX(finalPatch, knownSize, knownDimension, gutterWidth)
    var resolved = $.resolvePatch(finalPatch, x, gutterWidth);
    prettyPrint(resolved);
    // return $.resolvePatch(finalPatch, x, gutterWidth);
    return resolved;
  }

  return this;
}



