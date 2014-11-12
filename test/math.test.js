
var should = require('should');
var math = require('../lib/math');

describe('Utilities', function () {

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
      {w:100,h:25},
      {w:100,h:25},
      {w:100,h:25}
    ]);
  });

  it('should sum patch width across a dimension', function () {
    var patches = [
      {w:200,h:50},
      {w:400,h:100}
    ];

    math.sumPatches(patches, 'w').should.equal(600);
    math.sumPatches(patches, 'h').should.equal(150);
  });

});

describe('Computing Virtual Sizes', function () {

  it('should suport subtracting virtual sizes', function () {
    var size = math.subtract({x:1,g:5},{x:1,g:2});
    size.should.eql({x:0,g:3});
  });

  it('should suport adding virtual sizes', function () {
    var size = math.add({x:1,g:5},{x:1,g:2});
    size.should.eql({x:2,g:7});
  });

  it('should suport totaling an array of virtual sizes', function () {
    var size = math.sumSizes([
      {x:1,g:5},
      {x:1,g:2},
      {x:3,g:1}
    ]);
    size.should.eql({x:5,g:8});
  });

  it('should suport multiplying virtual sizes by integers', function () {
    var size = math.multiply({x:1,g:5},2);
    size.should.eql({x:2,g:10});
  });

  it('should handle the first patch by assuming it is 1x and 0gutter', function () {

    var patches = [
      {w:20, h:60},
      {w:40, h:60},
      {w:60, h:60}
    ];

    var patch = math.fitPatches(patches, 'w', {x:1,g:0});

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