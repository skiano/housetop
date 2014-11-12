
var _ = require('lodash');
var constants = require('./constants');
var AXIS = constants.AXIS;
var PLACE = constants.PLACE;
var DIMENSION = constants.DIMENSION;

// UTILITIES
module.exports.checkVirtualSize = checkVirtualSize;
module.exports.crossDimension = crossDimension;
module.exports.crossAxis = crossAxis;
module.exports.scalePatch = scalePatch;
module.exports.normalizePatches = normalizePatches;
module.exports.sumPatches = sumPatches;

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

// COMPUTING VIRTUAL SIZES
module.exports.fitPatches = fitPatches;
module.exports.subtract = subtract;
module.exports.add = add;
module.exports.multiply = multiply;
module.exports.sumSizes = sumSizes;

function subtract(a, b) {
  checkVirtualSize(a);
  checkVirtualSize(b);
  return {x: a.x - b.x, g: a.g - b.g};
};

function add (a, b) {
  checkVirtualSize(a);
  checkVirtualSize(b);
  return {x: a.x + b.x, g: a.g + b.g};
}

function sumSizes (virtualSizes) {
  return _.reduce(virtualSizes, function (total, size) {
    return add(total, size);
  }, {x:0, g:0});
  return {x: a.x + b.x, g: a.g + b.g};
}

function multiply(a, i) {
  checkVirtualSize(a);
  return {x: a.x * i, g: a.g * i};
};

function fitPatches (patches, targetDimension, targetSize) {
  // ensure a virtual size
  checkVirtualSize(targetSize);
  // make the target 
  normalizePatches(patches, crossDimension(targetDimension));

  var total = sumPatches(patches, targetDimension);
  var gutters = patches.length - 1;
  var materialSize = subtract(targetSize, {x:0,g:gutters});

  var testing = [];

  _.each(patches, function (patch) {
    var fraction = patch[targetDimension] / total;
    var virtualDimension = multiply(materialSize, fraction);
    testing.push(virtualDimension);
  });

  console.log(materialSize);
  console.log(sumSizes(testing));

  return {};
}

