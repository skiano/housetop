
var _ = require('lodash');

function fill (character, len) {
  return new Array(len + 1).join(character);
}

function previewSize (size) {
  if(typeof size === 'number') {
    return size;
  } else {
    return parseFloat(((size.x * 300) + (size.g * 20)).toFixed(5));
    return '(' + size.x + 'x,' + size.g + 'g)';
  }
}

function prettyPrint (patch) {

  var spacer = '  ';

  console.log(fill('=', 70));
  console.log('Patch:')
  subPrint(patch)
  console.log();

  function subPrint (patch, depth) {

    depth = depth || 0;
    
    var space = fill(spacer, depth);
    var size = previewSize(patch.w) + ' x ' + previewSize(patch.h);
    
    console.log()
    console.log(space, "|shape:",size);
    console.log(space, "|children:", patch.orientation || 'root');
    
    if(patch.patches) {
      _.each(patch.patches, function (patch) {
        subPrint(patch, depth + 1);
      });
    }
  }
}

module.exports.prettyPrint = prettyPrint;

