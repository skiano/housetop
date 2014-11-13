
var _ = require('lodash');
var $ = require('./library');
var constants = require('./constants');
var PLACE = constants.PLACE;
var DIMENSION = constants.DIMENSION;
var TARGET_DIMENSION = constants.TARGET_DIMENSION;
var ORIENTATION = constants.ORIENTATION;

module.exports = Housetop;

function Housetop (options, debug) {
  this.debug = debug; 
  
  var options = _.extend({
    baseOrientation: 'horizontal' 
  }, options);

  var self = this;
  var objects = [];
  var finalPatch = null;
  var rootSize = {x:1,g:0};

  function addMaterial (patches, placement) {
    // catch any bad values from the plan array 
    $.vallidatePlacement(placement);
    
    var targetDimension = TARGET_DIMENSION[placement];
    var targetSize = finalPatch ? finalPatch[targetDimension] : rootSize;
    var workingPatch = $.fitPatches(patches, targetDimension, targetSize);

    finalPatch = finalPatch ? 
                  $.combinePatch(finalPatch, workingPatch, placement) : 
                  workingPatch;

    return self;
  }

  /*
   * Public API
   */
  this.supply = function (objects) {
    objects = objects.concat(objects);
    return self;
  }

  this.base = function (patches) {
    var placement = (this.baseOrientation === 'horizontal') ? 
                      PLACE.right : PLACE.bottom;
    addMaterial(patches, placement);
    return self;
  }

  this.top = _.partialRight(addMaterial, PLACE.top);
  this.bottom = _.partialRight(addMaterial, PLACE.bottom);
  this.left = _.partialRight(addMaterial, PLACE.left);
  this.right = _.partialRight(addMaterial, PLACE.right);

  // support passing the complete plan as an array
  this.plan = function (actions) {
    // TODO: this feels a bit agressive 
    // but the first list item should 
    // work like the base argument
    actions[0][0] = 'base';
    _.each(actions, function (action) {
      self[action[0]](action[1]);
    });
  }

  this.render = function (knownSize, gutterWidth, knownDimension) {
    knownDimension = knownDimension || DIMENSION.w;
    
    var x = $.solveForX(finalPatch, knownSize, knownDimension, gutterWidth);

    // uses _.cloneDeep so render can be called
    // multiple times with the same plan
    var resolved = $.resolvePatch(_.cloneDeep(finalPatch), x, gutterWidth);
      
    if (debug) { $.vallidatePatch(resolved); }
    return resolved;
  }

  return this;
}



