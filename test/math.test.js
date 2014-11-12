
var should = require('should');
var math = require('../lib/math');

describe('utilities', function () {

  it('should return the cross dimension', function () {
    math.crossDimension('w').should.equal('h');
    math.crossDimension('h').should.equal('w');
  });

  it('should return the cross axis', function () {
    math.crossAxis('x').should.equal('y');
    math.crossAxis('y').should.equal('x');
  });

});

describe('Computing Sizes', function () {

  it('should handle the first patch by assuming it is 1x and 0gutter', function () {

    var patches = [
      {w:100, h:300},
      {w:100, h:300},
      {w:100, h:300}
    ];

    // var patch = math.fitGroup(patches, 'W', {x:1,g:0});

    // patch.should.eql({
    //   w: {x:1,g:0},
    //   h: {x:1,g:2},
    //   children: [
    //     {
    //       w: {x:1/3, g:2/3},
    //       y: {x:1, g:2}
    //     },
    //     {
    //       w: {x:1/3, g:2/3},
    //       y: {x:1, g:2}
    //     },
    //     {
    //       w: {x:1/3, g:2/3},
    //       y: {x:1, g:2}
    //     }
    //   ]
    // });

  });

});