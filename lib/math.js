
var _ = require('lodash');
var constants = require('./constants');
var AXIS = constants.AXIS;
var PLACE = constants.PLACE;
var DIMENSION = constants.DIMENSION;

// expose library
module.exports.checkVirtualSize = checkVirtualSize;
module.exports.crossDimension = crossDimension;
module.exports.crossAxis = crossAxis;
module.exports.scalePatch = scalePatch;
module.exports.normalizePatches = normalizePatches;
module.exports.sumPatches = sumPatches;
module.exports.fitGroup = fitGroup;

function checkVirtualSize (size) {
  if(!_.isObject(size) ||
       !size.hasOwnProperty('x') ||
       !size.hasOwnProperty('g')) {
    throw new Error(size + ' is not a virtual size of the format {x:int,g:int}');
  }
}

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

function normalizePatches (patches, targetDimension) {
  _.each(patches, function (patch) {
    scalePatch(patch, targetDimension, 100);
  });
  return patches;
}

function sumPatches (patches, targetDimension) {
  return _.reduce(patches, function (sum, patch) {
    return sum += patch[targetDimension];
  }, 0);
}

function fitGroup (patches, targetDimension, targetSize) {
  // ensure a virtual size
  checkVirtualSize(targetSize);
  // make the target 
  normalizePatches(patches);

  var total = sumPatches(patches, targetDimension);

  return patches;
}

