var should   = require('should');
var Tree     = require('./n-tree.js');

var n = new Tree([1, 1], [0, 0], 2);

n.getRelativeVector([0.6, 0.4]).should.equal(1);

n = new Tree([10, 10, 10, 10], [0, 0, 0, 0], 1);

n.getRelativeVector([3, 6, 5, 2]).should.equal(6);
n.getRelativeVector([6, 6, 6, 6]).should.equal(15);


n.insert([2, 4, 6, 8], "fortyFive!");
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
});

