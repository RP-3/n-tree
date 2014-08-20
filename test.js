var should   = require('should');
var Tree     = require('./n-tree.js');

var randomCoords = function(n, tree){
  for(var j=0; j<n; j++){
    //define some coordinates
    var coords = new Array(tree.maxima.length);
    for(var i=0; i<tree.maxima.length; i++){
      coords[i] = ((Math.random()*(tree.maxima[i]-tree.minima[i])) + tree.minima[i]);
    }

    var value = JSON.stringify(coords); //define a value

    tree.insert(coords, value); //insert it
  }
};

describe('getRelativeVector', function() {
  it('should return the correct relative direction from a point', function() {
    var n = new Tree([10, 10], [0, 0], 1);

    n.getRelativeVector([1, 1]).should.equal(0);
    n.getRelativeVector([6, 1]).should.equal(1);
    n.getRelativeVector([1, 6]).should.equal(2);
    n.getRelativeVector([6, 6]).should.equal(3);
  });

  it('should work with one-dimensional coordinate sets', function() {
    var n = new Tree([10], [0], 1);

    n.getRelativeVector([1]).should.equal(0);
    n.getRelativeVector([6]).should.equal(1);
  });

  it('should work with n-dimensional coordinate sets', function() {
    var n = new Tree([10, 10, 10, 10], [-10 ,-10, -10, -10], 1);

    n.getRelativeVector([-1, -1, -1, -1]).should.equal(0);
    n.getRelativeVector([1, -1, -1, -1]).should.equal(1);
    n.getRelativeVector([-1, 1, -1, -1]).should.equal(2);
    n.getRelativeVector([-1, -1, 1, -1]).should.equal(4);
    n.getRelativeVector([-1, -1, -1, 1]).should.equal(8);
    n.getRelativeVector([1, 1, -1, -1]).should.equal(3);
    n.getRelativeVector([-1, 1, 1, -1]).should.equal(6);
    n.getRelativeVector([1, -1, -1, 1]).should.equal(9);
    n.getRelativeVector([10, 10, 10, 10]).should.equal(15);
  });
});

describe('prototype.insert', function(){
  it('should insert into the correct position', function(){
    var n = new Tree([10, 10], [0, 0], 2);
    n.insert([1, 1], "value1");
    n.insert([1, 7.5], "value2");

    (n.children[0].values[0].value).should.equal('value1');
    (n.children[1] === undefined).should.equal(true);
    (n.children[2].values[0].value).should.equal('value2');
    (n.children[3] === undefined).should.equal(true);
    (n.children[4] === undefined).should.equal(true);
  });

  it('should nest correctly', function(){
    var n = new Tree([10, 10], [0, 0], 2);
    n.insert([1, 1], "value1");
    n.insert([1, 2], "value2");
    n.insert([1.1, 2.1], "value3");

    (n.children[0].children[0].children[0].values[0].value).should.equal('value1');
    (n.children[0].children[0].children[2].values[0].value).should.equal('value2');
  });
});

describe('value iteration function', function(){
  it('should find the correct number of points', function(){
    var n = new Tree([100, 100], [0, 0], 4);
    randomCoords(1000, n);

    var valueCounter = 0, proximityCounter = 0;
    n.each([100, 100], [0, 0], function(item){
      valueCounter++;
    });

    valueCounter.should.equal(1000);

    n.each([50, 50], [0, 0], function(item){
      proximityCounter++;
    });

    proximityCounter.should.be.approximately(250, 100);

  });

  it('should pass some reasonable stress tests', function(){
    var n = new Tree([100, 100], [0, 0], 10);

    var start = new Date();
    randomCoords(100000, n);

    var insertionComplete = new Date();

    var valueCounter = 0, proximityCounter = 0;
    n.each([100, 100], [0, 0], function(item){
      valueCounter++;
    });

    var iterationComplete = new Date();
    var insertionTime = insertionComplete - start;
    var iterationTime = iterationComplete - insertionComplete;

    valueCounter.should.equal(100000);
    insertionTime.should.be.lessThan(800);
    iterationTime.should.be.lessThan(30);

  });
});

// n = new Tree([1, 1], [0, 0], 2);

// var coord1, coord2;
// for(var k=0; k<100; k++){
//   coord1 = Math.random();
//   coord2 = Math.random();
//   n.insert([coord1, coord2], (coord1 + coord2).toString());
// }

// n.each([0.8, 0.6], [0.2, 0.5], function(item){
//   console.log(item.coords, item.value);
// });

