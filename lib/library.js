
var _ = require('../build/lodash.build');
var constants = require('./constants');
var PLACE = constants.PLACE;
var DIMENSION = constants.DIMENSION;
var ORIENTATION = constants.ORIENTATION;

var validPlacements = _.values(PLACE);

// UTILITIES
module.exports.vallidatePlacement = vallidatePlacement;
module.exports.getOrientation = getOrientation;
module.exports.getDimension = getDimension;
module.exports.checkVirtualSize = checkVirtualSize;
module.exports.crossDimension = crossDimension;
module.exports.scalePatch = scalePatch;
module.exports.normalizePatches = normalizePatches;
module.exports.sumPatches = sumPatches;
module.exports.parsePatchArg = parsePatchArg;

function vallidatePlacement (placement) {
  if (validPlacements.indexOf(placement) === -1) {
    throw new Error(placement + ' is not a valid placement')
    return;
  }
}

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

function parsePatchArg (arg, objects) {
  if (_.isNumber(arg)) {
    return objects.splice(0, arg);
    return objects;
  } else if (_.isArray(arg)) {
    return arg;
  } else if (_.isObject(arg)) {
    return [arg];
  } else {
    throw new Error('Bad patches argument', arg); 
  }
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
  precision = precision || 8;
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
  newPatch.orientation = getOrientation(targetDimension);

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
  combinedPatch[dimension].g += 1;
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
  combinedPatch[dimension].g += 1;
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

// Resolving patches
module.exports.solveForX = solveForX;
module.exports.computeRealSize = computeRealSize;
module.exports.resolvePatch = resolvePatch;
module.exports.vallidatePatch = vallidatePatch;
module.exports.isValidPatch = isValidPatch;
module.exports.weakCompare = weakCompare;

function solveForX (patch, knownSize, knownDimension, gutterWidth) {
  return (knownSize - patch[knownDimension].g * gutterWidth) / patch[knownDimension].x;
}

function computeRealSize (virtualSize, x, gutter) {
  var size = (virtualSize.x * x) + (virtualSize.g * gutter);
  return parseFloat( size.toFixed(5) );
}
 
function resolvePatch (patch, x, gutter) {

  if (!x || !gutter) {
    throw new Error('Missing required variables for resolving patch');
  }
  
  patch.w = computeRealSize(patch.w, x, gutter);
  patch.h = computeRealSize(patch.h, x, gutter);
  patch.gutter = gutter;
  
  if(patch.patches) {
    patch.patches = _.map(patch.patches, function (childPatch) {
      return resolvePatch(childPatch, x, gutter);
    });
  }

  return patch;
}

function weakCompare (a, b) {
  return Math.round(a) === Math.round(b);
}

function vallidatePatch (patch) {
  // root patches can be any dimension
  if (!patch.patches) { return true; }

  // what dimension should be summed
  var dimension = getDimension(patch.orientation);
  
  var cross = crossDimension(dimension);

  // compute the sum including the gutters
  var sum = _.reduce(_.pluck(patch.patches, dimension), function(sum, num) {
    return sum + num;
  }) + (patch.gutter * (patch.patches.length-1));

  var crossSize = _.uniq(_.pluck(patch.patches, cross));
  var normalized = crossSize.length === 1;

  if(normalized && 
      weakCompare(sum, patch[dimension]) &&
      crossSize[0] === patch[cross]) {
    return _.map(patch.patches, vallidatePatch);
  } else {
    throw new Error('Invalid Patch:\n' + JSON.stringify(patch, null, 2));
    return;
  }
}

function isValidPatch (patch) {
  try {
    vallidatePatch(patch);
    return true;
  } catch (e) {
    return false;
  }
}




