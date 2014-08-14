var window = window || undefined;
if(this !== window) var QuadTree = require('./QuadTree.js');

//simple testing function
var test = function(condition, assertion, expectedValue){
  var color = assertion ? 'color: #009933' : 'color: #FF0000';
  console.log('%c' + condition, color);
  if(!assertion){
    console.log('Result: ', expectedValue);
  }
};


var n = new Tree([1, 1], [0, 0], null);

//test helper functions
test('Expect 1', null, n.getRelativeVector([0.6, 0.4]));
n = new Tree([10, 10, 10, 10], [0, 0, 0, 0], null);
test('Expect 6', null, n.getRelativeVector([3, 6, 5, 2]));
test('Expect 15', null, n.getRelativeVector([6, 6, 6, 6]));


Leaf.prototype.limit = 2;
n.insert([2, 4, 6, 8], "fortyFive!");
//insert expectations

n = new Tree([10, 10], [0, 0], null);
n.insert([1, 6], 'value1');
n.insert([2, 7], 'value2');
n.insert([1.5, 6.5], 'value3');

console.log(n.query([10,10],[0,0]));

n.each([10,10],[0,0], function(item){
  console.log(item.coords, item.value);
});
