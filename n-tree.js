/*helper functions*/
var divide = function(array, divisor){
  return array.map(function(element){
    return element / divisor;
  });
};

var subtract = function(subtractor, subtractee){
  var result = new Array(subtractor.length);
  for(var i=0; i<subtractor.length; i++){
    result[i] = subtractor[i] - subtractee[i];
  }
  return result;
};

var add = function(array1, array2){
  var result = new Array(array1.length);
  for(var i=0; i<array1.length; i++){
    result[i] = array1[i] + array2[i];
  }
  return result;
};

var getCentre = function(maxima, minima){
  return add(minima, divide(subtract(maxima, minima), 2));
};

/*Tree class. Has neither values nor control over its coordinates*/
var Tree = function(maxima, minima, parent, centre){
  this.parent = parent;
  this.maxima = maxima;
  this.minima = minima;
  this.centre = centre || getCentre(maxima, minima);
  this.children = new Array(1 << maxima.length);
};

Tree.prototype.getRelativeVector = function(coords){
  var result = 0;
  for(var i=0, bit=1; i<coords.length; i++){
    result = coords[i] >= this.centre[i] ? result | bit : result;
    bit = bit << 1;
  }
  return result;
};

Tree.prototype.insert = function(coords, value) {
  //find out which child to insert into
  var insertionVector = this.getRelativeVector(coords);
  var childRef = this.children[insertionVector];

  //if that child is empty, make a new leaf out of it
  if(childRef === undefined){
    this.children[insertionVector] = new Leaf(this, insertionVector);
    this.children[insertionVector].insert(coords, value);
  }
  //else if that child is a branch or a leaf, recurse down
  //to either insert or subdivide as appropriate
  else{
    this.children[insertionVector].insert(coords, value);
  }
};

/*Leaf class. Has value, assigned to specified coordinates*/
var Leaf = function(parent, relativePosition){
  this.parent = parent;
  this.values = [];
  this.getCentreAndRegion(relativePosition);
};

Leaf.prototype.getCentreAndRegion =
Tree.prototype.getCentreAndRegion = function(vector){
  var maxima = this.parent.maxima;
  var minima = this.parent.minima;
  var parentCentre = this.parent.centre;

  var radii = divide(subtract(maxima, parentCentre), 2);
  
  this.centre = new Array(maxima.length);
  this.maxima = new Array(maxima.length);
  this.minima = new Array(maxima.length);
  this.vector = vector;

  for(var i=0, bit=1; i<maxima.length; i++){
    if(vector & bit){
      this.centre[i] = parentCentre[i] + radii[i];
      this.maxima[i] = maxima[i];
      this.minima[i] = parentCentre[i];
    }else{
      this.centre[i] = parentCentre[i] - radii[i];
      this.maxima[i] = parentCentre[i];
      this.minima[i] = minima[i];
    }
    bit = bit << 1;
  }

};

Leaf.prototype.insert = function(coords, value) {
  if(this.values.length < this.limit){
    this.values.push({
      coords: coords,
      value: value
    });
  }else{
    this.subdivide(coords, value);
  }
};

Leaf.prototype.subdivide = function(coords, value) {
  var subdivision = new Tree(this.maxima, this.minima, this, this.centre);
  for(var i=0; i<this.values.length; i++){
    subdivision.insert(this.values[i].coords, this.values[i].value);
  }
  subdivision.insert(coords, value);
  this.parent.children[this.vector] = subdivision;
};

//dimensions = [50, 100, 150]
var nMap = function(maxima, minima, limit){
  var tree = new Tree(maxima, minima, null);
  Leaf.prototype.limit = limit;
};







