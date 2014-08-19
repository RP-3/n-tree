var should   = require('should');
var Tree     = require('./n-tree.js');

var randomCoords = function(maxima, minima){
  var result = new Array(maxima.length);
  for(var i=0; i<maxima.length; i++){
    result.push((Math.random()*(maxima[i]-minima[i])) + minima[i]);
  }
  return result;
};

describe('getRelativeVector', function() {
  n = new Tree([10, 10], [0, 0], 1);
  it('should return the correct relative direction from a point', function() {
    n.getRelativeVector([1, 1]).should.equal(0);
    n.getRelativeVector([6, 1]).should.equal(1);
    n.getRelativeVector([1, 6]).should.equal(2);
    n.getRelativeVector([6, 6]).should.equal(3);
  });
});


/*n.insert([2, 4, 6, 8], "fortyFive!");
//insert expectations


n = new Tree([1, 1], [0, 0], 2);
// n.insert([1, 6], 'value1');
// n.insert([2, 7], 'value2');
// n.insert([1.5, 6.5], 'value3');

var coord1, coord2;
for(var k=0; k<100; k++){
  coord1 = Math.random();
  coord2 = Math.random();
  n.insert([coord1, coord2], (coord1 + coord2).toString());
}

n.each([0.8, 0.6], [0.2, 0.5], function(item){
  console.log(item.coords, item.value);
});*/

