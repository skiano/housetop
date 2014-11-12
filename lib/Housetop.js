
var _ = require('lodash');
var $ = require('./library');
var constants = require('./constants');
var PLACE = constants.PLACE;
var DIMENSION = constants.DIMENSION;
var TARGET_DIMENSION = constants.TARGET_DIMENSION;
var ORIENTATION = constants.ORIENTATION;

module.exports = Housetop;

function Housetop (options) {

  var options = _.extend({
    width: 1000, 
    gutter: 20,
    baseOrientation: 'horizontal' 
  }, options);

  var finalPatch = null;
  var rootSize = {x:1,g:0};

  var self = this;
  function addMaterial (patches, placement) {
    
    var targetDimension = TARGET_DIMENSION[placement];
    var targetSize = finalPatch ? finalPatch[targetDimension] : rootSize;
    
    // create a patch that is the correct virtual size
    var workingPatch = $.fitPatches(patches, targetDimension, targetSize);

    // save the orientation for rendering
    workingPatch.orientation = $.getOrientation(targetDimension); 

    console.log(workingPatch);

    return self;
  }

  this.base = function (patches) {
    var placement = (this.baseOrientation === 'horizontal') ? 
                      PLACE.bottom : PLACE.right;
    return addMaterial(patches, placement);
  }

  this.top = _.partialRight(addMaterial, PLACE.top);
  this.bottom = _.partialRight(addMaterial, PLACE.bottom);
  this.left = _.partialRight(addMaterial, PLACE.left);
  this.right = _.partialRight(addMaterial, PLACE.right);

  return this;
}



