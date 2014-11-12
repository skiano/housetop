
var _ = require('lodash');

function fill (character, len) {
  return new Array(len + 1).join(character);
}

function previewSize (size) {
  if(typeof size === 'number') {
    return size;
  } else {
    return size.x + 'x + ' + size.g + 'g';
  }
}

function prettyPrint (patch) {

  console.log(fill('=', 70));
  subPrint(patch)

  function subPrint (patch, depth) {

    depth = depth || 0;
    
    var space = fill('\t', depth);
    
    console.log(fill('- ', 35));
    console.log(space, patch.orientation || 'root');
    console.log(space, 'w:', previewSize(patch.w));
    console.log(space, 'h:', previewSize(patch.h));
    
    if(patch.patches) {
      _.each(patch.patches, _.partialRight(subPrint, depth + 1));  
    }
  }
}

module.exports.prettyPrint = prettyPrint;

