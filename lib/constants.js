
var PLACE = {
  top: 'top',
  bottom: 'bottom',
  left: 'left',
  right: 'right'
};

var DIMENSION = {
  w: 'w',
  h: 'h'
};

var ORIENTATION = {
  horizontal: 'horizontal',
  vertical: 'vertical'
}

// create a map for getting the target 
// dimension associated with each placement
var TARGET_DIMENSION = {}
TARGET_DIMENSION[PLACE.top] = DIMENSION.w;
TARGET_DIMENSION[PLACE.bottom] = DIMENSION.w;
TARGET_DIMENSION[PLACE.left] = DIMENSION.h;
TARGET_DIMENSION[PLACE.right] = DIMENSION.h;

// expose values
module.exports.PLACE = PLACE;
module.exports.DIMENSION = DIMENSION;
module.exports.ORIENTATION = ORIENTATION;
module.exports.TARGET_DIMENSION = TARGET_DIMENSION;