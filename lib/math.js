
var _ = require('lodash');
var constants = require('./constants');
var AXIS = constants.AXIS;
var PLACE = constants.PLACE;
var DIMENSION = constants.DIMENSION;

// expose library
module.exports.crossDimension = crossDimension;
module.exports.crossAxis = crossAxis;
module.exports.fitGroup = fitGroup;

function crossDimension (dimension) {
  return (dimension === DIMENSION.w) ? DIMENSION.h : DIMENSION.w;
}

function crossAxis (axis) {
  return (axis === AXIS.x) ? AXIS.y : AXIS.x;
}

function normalize (patches, targetDimension) {
  // assume each patch is the same in the cross dimension;
}

function fitGroup (patches, targetDimension, targetSize) {

  return patches;
}

