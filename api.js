var nMap = require('./n-tree.js')([10, 10], [0, 0], 4);

var coord1, coord2;
for(var i=0; i<1000; i++){
  coord1 = Math.floor(Math.random()*10);
  coord2 = Math.floor(Math.random()*10);
  nMap.insert([coord1, coord2], (coord1 + coord2).toString());
}

nMap.each([4, 6], [2, 5], function(item){
  console.log(item.coords, item.value);
});
