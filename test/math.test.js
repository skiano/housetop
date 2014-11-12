
var should = require('should');
var math = require('../lib/math');

describe('utilities', function () {

  it('should support vallidating virtual sizes', function () {
    (function(){
      math.checkVirtualSize(1);
    }).should.throw(/not a virtual/);
    
    (function(){
      math.checkVirtualSize({x:1,g:0});
    }).should.not.throw();
  });

  it('should return correct cross dimension', function () {
    math.crossDimension('w').should.equal('h');
    math.crossDimension('h').should.equal('w');
  });

  it('should return correct cross axis', function () {
    math.crossAxis('x').should.equal('y');
    math.crossAxis('y').should.equal('x');
  });

  it('should scale a patch correctly', function () {
    var patch = {w:100,h:200};
    
    math.scalePatch(patch, 'w', 200);
    patch.w.should.equal(200);
    patch.h.should.equal(400);

    math.scalePatch(patch, 'h', 10);
    patch.w.should.equal(5);
    patch.h.should.equal(10);
  });

  it('should normalize patches', function () {
    var patches = math.normalizePatches([
      {w:200,h:50},
      {w:400,h:100},
      {w:4,h:1}
    ],'w');
    patches.should.eql([
      {w:1,h:1/4},
      {w:1,h:1/4},
      {w:1,h:1/4}
    ]);
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