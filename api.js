var nMap = require('./n-tree.js')([10, 10], [0, 0], 4);

var r = function(upperLimit){
  upperLimit = upperLimit || 10;
  return Math.random()*upperLimit;
};

var coord1, coord2;
for(var i=0; i<100; i++){
  coord1 = (Math.random()*10);
  coord2 = (Math.random()*10);
  nMap.insert([coord1, coord2], (coord1 + coord2).toString());
}

nMap.each([4, 6], [2, 5], function(item){
  //console.log(item);
});

var query = nMap.query([4, 5], [3, 4]);
//console.log(query);

var getDistance = function(a, b){
  var sumSq = 0;
  for(var i=0; i<a.length; i++){
    sumSq += Math.pow(a[i] - b[i], 2);
  }
  return Math.sqrt(sumSq);
};

var getNearestNeighbours = function(coords, k){
  var results = [];
  nMap.eachNode(coords, coords, function(leaf){
    for(var i=0; i<leaf.values.length; i++){
      results.push(leaf.values[i]);
    }
    
  });
};