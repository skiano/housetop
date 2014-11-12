
var should = require('should');
var $ = require('../lib/library');

describe('Utilities', function () {

  it('should convert dimensions to orientations correctly', function () {
    $.getOrientation('w').should.equal('horizontal');
    $.getOrientation('h').should.equal('vertical');
    // the following feel a bit 
    // counter intuitive, but prove more helpful this way
    $.getOrientation('top').should.equal('vertical');
    $.getOrientation('bottom').should.equal('vertical');
    $.getOrientation('left').should.equal('horizontal');
    $.getOrientation('right').should.equal('horizontal');
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

  it('should take basic patches and fit them to a virtual size', function () {

    var patches = [
      {w:20, h:60},
      {w:40, h:60},
      {w:60, h:60}
    ];

    var patch = $.fitPatches(patches, 'w', {x:1,g:0});

    patch.should.eql({
      w: {x:1,g:0},
      h: $.roundVirtualSize({x:1/2,g:-1}),
      orientation: 'horizontal',
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

    // testing single
    // most common initial state
    var patches = [{w:20, h:20}];
    var patch = $.fitPatches(patches, 'w', {x:1,g:0});

    patch.should.eql({
      w: {x:1,g:0},
      h: {x:1,g:0},
      orientation: 'horizontal',
      patches: [
        {
          w: {x:1,g:0},
          h: {x:1,g:0},
        }
      ]
    });

  });

});

describe('Combining Patches', function () {
  
  it('should support adding a patch before', function () {

    var currentPatch = {
      w: {x:1,g:0},
      h: {x:2,g:1}
    };

    var newPatch = {
      w: {x:1,g:0},
      h: {x:3,g:3}
    };

    var combinedPatch = $.addPatchBefore(currentPatch, newPatch, 'vertical');

    combinedPatch.should.eql({
      w: {x:1,g:0},
      h: {x:5,g:5}, // also adds 1 gutter
      orientation: 'vertical',
      patches: [newPatch, currentPatch]
    });

    // make sure this is not a deep equal
    combinedPatch.h.should.not.equal(currentPatch.h);
    combinedPatch.w.should.not.equal(currentPatch.w);
    
  });

  it('should support adding a patch after', function () {

    var currentPatch = {
      w: {x:2,g:2},
      h: {x:3,g:3}
    };

    var newPatch = {
      w: {x:4,g:4},
      h: {x:3,g:3}
    };

    var combinedPatch = $.addPatchAfter(currentPatch, newPatch, 'horizontal');

    combinedPatch.should.eql({
      w: {x:6,g:7}, // also adds 1 gutter
      h: {x:3,g:3},
      orientation: 'horizontal',
      patches: [currentPatch, newPatch]
    });

    // make sure this is not a deep equal
    combinedPatch.h.should.not.equal(currentPatch.h);
    combinedPatch.w.should.not.equal(currentPatch.w);

  });

  it('should support prepending a patch', function () {

    var childPatch = {
      w: {x:2,g:0},
      h: {x:2,g:0}
    };

    var currentPatch = {
      w: childPatch.w,
      h: childPatch.h,
      patches: [childPatch]
    };

    var newPatch = {
      w: {x:4,g:0},
      h: {x:2,g:0}
    };

    var combinedPatch = $.prependPatch(currentPatch, newPatch, 'horizontal');

    combinedPatch.should.eql({
      w: {x:6,g:0},
      h: {x:2,g:0},
      patches: [newPatch, childPatch]
    });

  });

  it('should support appending a patch', function () {
    
    var childPatch = {
      w: {x:2,g:0},
      h: {x:2,g:0}
    };

    var currentPatch = {
      w: childPatch.w,
      h: childPatch.h,
      patches: [childPatch]
    };

    var newPatch = {
      w: {x:4,g:0},
      h: {x:2,g:0}
    };

    var combinedPatch = $.appendPatch(currentPatch, newPatch, 'vertical');

    combinedPatch.should.eql({
      w: {x:2,g:0},
      h: {x:4,g:0},
      patches: [childPatch, newPatch]
    });

  });

  /*
   * Test the combinations where orientation 
   * and placement agree
   *
   */
  it('should place above a vertical patch correctly', function () {

    var placement = 'top';
    var orientation = 'vertical';
    var childPatch = {w: {x:1,g:1},h: {x:1,g:1}};

    var currentPatch = {
      w: {x:1,g:1},
      h: {x:1,g:1},
      orientation: orientation,
      patches: [childPatch]
    };

    var newPatch = {w: {x:2,g:2}, h: {x:2,g:2}};

    var combinedPatch = $.combinePatch(currentPatch, newPatch, placement);

    combinedPatch.should.eql({
      w: {x:1,g:1},
      h: {x:3,g:3},
      orientation: orientation,
      patches: [newPatch,childPatch]
    });

  });

  it('should place below a vertical patch', function () {

    var placement = 'bottom';
    var orientation = 'vertical';
    var childPatch = {w: {x:1,g:1},h: {x:1,g:1}};

    var currentPatch = {
      w: {x:1,g:1},
      h: {x:1,g:1},
      orientation: orientation,
      patches: [childPatch]
    };

    var newPatch = {w: {x:2,g:2}, h: {x:2,g:2}};

    var combinedPatch = $.combinePatch(currentPatch, newPatch, placement);

    combinedPatch.should.eql({
      w: {x:1,g:1},
      h: {x:3,g:3},
      orientation: orientation,
      patches: [childPatch, newPatch]
    });

  });

  it('should place to the right of a horizontal patch', function () {

    var placement = 'right';
    var orientation = 'horizontal';
    var childPatch = {w: {x:1,g:1},h: {x:1,g:1}};

    var currentPatch = {
      w: {x:1,g:1},
      h: {x:1,g:1},
      orientation: orientation,
      patches: [childPatch]
    };

    var newPatch = {w: {x:2,g:2}, h: {x:2,g:2}};

    var combinedPatch = $.combinePatch(currentPatch, newPatch, placement);

    combinedPatch.should.eql({
      w: {x:3,g:3},
      h: {x:1,g:1},
      orientation: orientation,
      patches: [childPatch, newPatch]
    });

  });

  it('should place to the left of a horizontal patch', function () {

    var placement = 'left';
    var orientation = 'horizontal';
    var childPatch = {w: {x:1,g:1},h: {x:1,g:1}};

    var currentPatch = {
      w: {x:1,g:1},
      h: {x:1,g:1},
      orientation: orientation,
      patches: [childPatch]
    };

    var newPatch = {w: {x:2,g:2}, h: {x:2,g:2}};

    var combinedPatch = $.combinePatch(currentPatch, newPatch, placement);

    combinedPatch.should.eql({
      w: {x:3,g:3},
      h: {x:1,g:1},
      orientation: orientation,
      patches: [newPatch, childPatch]
    });

  });

  /*
   * Test the combinations where orientation 
   * and placement disagree
   *
   */
  it('should place above a horizontal patch', function () {

    var placement = 'top';
    var orientation = 'horizontal';
    var combinedOrientation = 'vertical';

    var currentPatch = {
      w: {x:1,g:1},
      h: {x:1,g:1},
      orientation: orientation
    };

    var newPatch = {w: {x:2,g:2}, h: {x:2,g:2}};

    var combinedPatch = $.combinePatch(currentPatch, newPatch, placement);

    combinedPatch.should.eql({
      w: {x:1,g:1},
      h: {x:3,g:4}, // plus gutter
      orientation: combinedOrientation,
      patches: [newPatch,currentPatch]
    });

  });

  it('should place below a horizontal patch', function () {

    var placement = 'bottom';
    var orientation = 'horizontal';
    var combinedOrientation = 'vertical';

    var currentPatch = {
      w: {x:1,g:1},
      h: {x:1,g:1},
      orientation: orientation
    };

    var newPatch = {w: {x:2,g:2}, h: {x:2,g:2}};

    var combinedPatch = $.combinePatch(currentPatch, newPatch, placement);

    combinedPatch.should.eql({
      w: {x:1,g:1},
      h: {x:3,g:4}, // plus gutter
      orientation: combinedOrientation,
      patches: [currentPatch, newPatch]
    });

  });

  it('should place to the right of a vertical patch', function () {

    var placement = 'right';
    var orientation = 'vertical';
    var combinedOrientation = 'horizontal';

    var currentPatch = {
      w: {x:1,g:1},
      h: {x:1,g:1},
      orientation: orientation
    };

    var newPatch = {w: {x:2,g:2}, h: {x:2,g:2}};

    var combinedPatch = $.combinePatch(currentPatch, newPatch, placement);

    combinedPatch.should.eql({
      w: {x:3,g:4}, // plus gutter
      h: {x:1,g:1},
      orientation: combinedOrientation,
      patches: [currentPatch, newPatch]
    });

  });

  

  it('should place to the left of a vertical patch', function () {

    var placement = 'left';
    var orientation = 'vertical';
    var combinedOrientation = 'horizontal';

    var currentPatch = {
      w: {x:1,g:1},
      h: {x:1,g:1},
      orientation: orientation
    };

    var newPatch = {w: {x:2,g:2}, h: {x:2,g:2}};

    var combinedPatch = $.combinePatch(currentPatch, newPatch, placement);

    combinedPatch.should.eql({
      w: {x:3,g:4}, // plus gutter
      h: {x:1,g:1},
      orientation: combinedOrientation,
      patches: [newPatch, currentPatch]
    });

  });

});

describe('Resolving Patches', function () {

  it('should be able to solve for x given g and one known dimension', function () {

    var patch = {
      w: {x:1, g:1},
      h: {x:2, g:2}
    };
    var gutterWidth = 10;
    var knownWidth = 110;
    var knownHeight = 110;
    $.solveForX(patch, knownWidth, 'w', gutterWidth).should.eql(100);
    $.solveForX(patch, knownWidth, 'h', gutterWidth).should.eql(45);

  });

});

