
var _ = require('lodash');
var constants = require('./constants');
var PLACE = constants.PLACE;
var DIMENSION = constants.DIMENSION;
var ORIENTATION = constants.ORIENTATION;

var ROUNDING_PRECISION = 8;

// UTILITIES
module.exports.getOrientation = getOrientation;
module.exports.getDimension = getDimension;
module.exports.checkVirtualSize = checkVirtualSize;
module.exports.crossDimension = crossDimension;
module.exports.scalePatch = scalePatch;
module.exports.normalizePatches = normalizePatches;
module.exports.sumPatches = sumPatches;

function getOrientation (dimension) {
  if (dimension === DIMENSION.h || 
        dimension === PLACE.top || 
        dimension === PLACE.bottom) {
    
    return ORIENTATION.vertical;
  
  } else if (dimension === DIMENSION.w || 
               dimension === PLACE.left || 
               dimension === PLACE.right) {

    return ORIENTATION.horizontal;

  } else {
    throw new Error(dimension + ' is not a valid dimension.');
  }
}

function getDimension (orientation) {
  if (orientation === ORIENTATION.horizontal) {
    return DIMENSION.w;
  } else if (orientation === ORIENTATION.vertical) {
    return DIMENSION.h;
  } else {
    throw new Error(orientation + ' is not a valid orientation.');
  }
}

function checkVirtualSize (size) {
  if(!_.isObject(size) ||
       !size.hasOwnProperty('x') ||
       !size.hasOwnProperty('g')) {
    throw new Error(size + ' is not a virtual size of the format {x:int,g:int}.');
  }
}

function crossDimension (dimension) {
  return (dimension === DIMENSION.w) ? DIMENSION.h : DIMENSION.w;
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
module.exports.subtract = subtract;
module.exports.add = add;
module.exports.multiply = multiply;
module.exports.sumSizes = sumSizes;
module.exports.roundVirtualSize = roundVirtualSize;
module.exports.fitPatches = fitPatches;

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

function multiply (a, i) {
  checkVirtualSize(a);
  return {x: a.x * i, g: a.g * i};
};

function roundVirtualSize (a, precision) {
  precision = precision || ROUNDING_PRECISION;
  return {
    x: parseFloat(a.x.toFixed(precision)), 
    g: parseFloat(a.g.toFixed(precision))
  };
}

function fitPatches (patches, targetDimension, targetSize) {
  // ensure a virtual size
  checkVirtualSize(targetSize);
  // make the target 
  var cross = crossDimension(targetDimension);
  normalizePatches(patches, cross);

  var total = sumPatches(patches, targetDimension);
  var gutters = patches.length - 1;
  var materialSize = subtract(targetSize, {x:0,g:gutters});

  var testing = [];

  _.each(patches, function (patch) {
    var patchRatio = patch[cross] / patch[targetDimension];
    var fraction = patch[targetDimension] / total;
    var virtualDimension = multiply(materialSize, fraction);
    var virtualCross = multiply(virtualDimension, patchRatio);
    // overwrite integer dimensions with correct virtual dimensions
    patch[targetDimension] = roundVirtualSize(virtualDimension);
    patch[cross] = roundVirtualSize(virtualCross);
  });

  var newPatch = {};
  newPatch[targetDimension] = targetSize;
  newPatch[cross] = patches[0][cross];
  newPatch.patches = patches;

  return newPatch;
}

// COMBINING PATCHES
module.exports.addPatchBefore = addPatchBefore;
module.exports.addPatchAfter = addPatchAfter;
module.exports.prependPatch = prependPatch;
module.exports.appendPatch = appendPatch;
module.exports.combinePatch = combinePatch;

function addPatchBefore (currentPatch, newPatch, orientation) {

  var dimension = getDimension(orientation);
  var cross = crossDimension(dimension);

  var combinedPatch = {
    orientation: orientation,
    patches: [newPatch, currentPatch]
  }

  combinedPatch[dimension] = add(currentPatch[dimension],newPatch[dimension]);
  combinedPatch[cross] = _.clone(currentPatch[cross]);

  return combinedPatch;

}

function addPatchAfter (currentPatch, newPatch, orientation) {

  var dimension = getDimension(orientation);
  var cross = crossDimension(dimension);

  var combinedPatch = {
    orientation: orientation,
    patches: [currentPatch, newPatch]
  }

  combinedPatch[dimension] = add(currentPatch[dimension],newPatch[dimension]);
  combinedPatch[cross] = _.clone(currentPatch[cross]);

  return combinedPatch;

}

function prependPatch (currentPatch, newPatch, orientation) {

  var dimension = getDimension(orientation);
  var cross = crossDimension(dimension);

  currentPatch[dimension] = add(currentPatch[dimension],newPatch[dimension]);
  currentPatch.patches.unshift(newPatch);
  
  return currentPatch;

}

function appendPatch (currentPatch, newPatch, orientation) {

  var dimension = getDimension(orientation);
  var cross = crossDimension(dimension);

  currentPatch[dimension] = add(currentPatch[dimension],newPatch[dimension]);
  currentPatch.patches.push(newPatch);
  
  return currentPatch;

}

function combinePatch (currentPatch, newPatch, placement) {

  var orientation = getOrientation(placement);
  var patchesAgree = orientation === currentPatch.orientation;
  var action;

  if (placement === PLACE.bottom || placement === PLACE.right) {
    action = patchesAgree ? appendPatch : addPatchAfter;
  } else {
    action = patchesAgree ? prependPatch : addPatchBefore;
  }

  return action(currentPatch, newPatch, orientation);

};

