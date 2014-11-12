
var _ = require('lodash');
var constants = require('./constants');
var AXIS = constants.AXIS;
var PLACE = constants.PLACE;
var DIMENSION = constants.DIMENSION;

// expose library
module.exports.crossDimension = crossDimension;
module.exports.crossAxis = crossAxis;
module.exports.scalePatch = scalePatch;
module.exports.fitGroup = fitGroup;

function crossDimension (dimension) {
  return (dimension === DIMENSION.w) ? DIMENSION.h : DIMENSION.w;
}

function crossAxis (axis) {
  return (axis === AXIS.x) ? AXIS.y : AXIS.x;
}

function scalePatch (patch, targetDimension, targetSize) {
  var cross = crossDimension(targetDimension);
  var crossSize = patch[cross] / patch[targetDimension] * targetSize;
  patch[cross] = crossSize;
  patch[targetDimension] = targetSize;
  return patch;
}

function normalize (patches, targetDimension) {
  // assume each patch is the same in the cross dimension;
  var cross = crossDimension(targetDimension);
  var total = 1; // so it can be translated to 'size' easily
  // _.each(patches, function(

  // ));
}

function fitGroup (patches, targetDimension, targetSize) {

  return patches;
}

