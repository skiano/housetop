
var should = require('should');
var $ = require('../lib/library');

describe('Utilities', function () {

  it('should convert dimensions to orientations correctly', function () {
    $.getOrientation('w').should.equal('horizontal');
    $.getOrientation('h').should.equal('vertical');
    (function(){
      $.getOrientation('W');
    }).should.throw(/not a valid dimension/);
  });

  it('should convert dimensions to orientations to dimensions correctly', function () {
    $.getDimension('horizontal').should.equal('w');
    $.getDimension('vertical').should.equal('h');
    (function(){
      $.getDimension('other');
    }).should.throw(/not a valid orientation/);
  });

  it('should support vallidating virtual sizes', function () {
    (function(){
      $.checkVirtualSize(1);
    }).should.throw(/not a virtual/);
    
    (function(){
      $.checkVirtualSize({x:1,g:0});
    }).should.not.throw();
  });

  it('should return correct cross dimension', function () {
    $.crossDimension('w').should.equal('h');
    $.crossDimension('h').should.equal('w');
  });

  it('should scale a patch correctly', function () {
    var patch = {w:100,h:200};
    
    $.scalePatch(patch, 'w', 200);
    patch.w.should.equal(200);
    patch.h.should.equal(400);

    $.scalePatch(patch, 'h', 10);
    patch.w.should.equal(5);
    patch.h.should.equal(10);
  });

  it('should normalize patches', function () {
    var patches = $.normalizePatches([
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

    $.sumPatches(patches, 'w').should.equal(600);
    $.sumPatches(patches, 'h').should.equal(150);
  });

});

describe('Computing Virtual Sizes', function () {

  it('should suport subtracting virtual sizes', function () {
    var size = $.subtract({x:1,g:5},{x:1,g:2});
    size.should.eql({x:0,g:3});
  });

  it('should suport adding virtual sizes', function () {
    var size = $.add({x:1,g:5},{x:1,g:2});
    size.should.eql({x:2,g:7});
  });

  it('should suport totaling an array of virtual sizes', function () {
    var size = $.sumSizes([
      {x:1,g:5},
      {x:1,g:2},
      {x:3,g:1}
    ]);
    size.should.eql({x:5,g:8});
  });

  it('should suport multiplying virtual sizes by integers', function () {
    var size = $.multiply({x:1,g:5},2);
    size.should.eql({x:2,g:10});
  });

  it('should be able to round virtual size', function () {
    var size = $.roundVirtualSize({
      x:1.0000000000,
      g:5.9999999999
    }, 6);
    size.should.eql({x:1,g:6});
  });

  it('should handle the first patch by assuming it is 1x and 0gutter', function () {

    var patches = [
      {w:20, h:60},
      {w:40, h:60},
      {w:60, h:60}
    ];

    var patch = $.fitPatches(patches, 'w', {x:1,g:0});

    patch.should.eql({
      w: {x:1,g:0},
      h: $.roundVirtualSize({x:1/2,g:-1}),
      patches: [
        {
          w: $.roundVirtualSize({x:1/6, g:-1/3}),
          h: $.roundVirtualSize({x:1/2,g:-1})
        },
        {
          w: $.roundVirtualSize({x:1/3, g:-2/3}),
          h: $.roundVirtualSize({x:1/2,g:-1})
        },
        {
          w: $.roundVirtualSize({x:1/2, g:-1}),
          h: $.roundVirtualSize({x:1/2,g:-1})
        }
      ]
    });

  });

});

describe('Combining Patches', function () {
  
  it('should support adding a patch before', function () {

  });

  it('should support adding a patch after', function () {

  });

  it('should support prepending a patch', function () {

  });

  it('should support appending a patch', function () {
    
  });

  it('should determine how to add patch based on the placement', function () {
    
    // var currentPatch = {
    //   w: {x:}
    // }

    // $.combinePatch

  });

});

