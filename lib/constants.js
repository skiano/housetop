
module.exports.PLACE = {
  top: 'top',
  bottom: 'bottom',
  left: 'left',
  right: 'right'
};

module.exports.DIMENSION = {
  w: 'w',
  h: 'h'
};

module.exports.ORIENTATION = {
  horizontal: 'horizontal',
  vertical: 'vertical'
}

// create a map for getting the target 
// dimension associated with each placement
var TARGET_DIMENSION = {}
TARGET_DIMENSION[module.exports.PLACE.top] = module.exports.DIMENSION.w;
TARGET_DIMENSION[module.exports.PLACE.bottom] = module.exports.DIMENSION.w;
TARGET_DIMENSION[module.exports.PLACE.left] = module.exports.DIMENSION.h;
TARGET_DIMENSION[module.exports.PLACE.right] = module.exports.DIMENSION.h;
module.exports.TARGET_DIMENSION = TARGET_DIMENSION;