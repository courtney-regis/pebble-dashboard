var PColor = function(name, named, hex, colorMap)
{
  this.name = name;
  this.named = named;
  this.hex = hex;
  
  //Add color to the map
  if(colorMap)
  {
    colorMap.addColor(this);  
  }
};

var addColor = function(color)
{
  this[color.name] = color;
  return this; 
};

//CREATE COLOR MAP
var pColors = {
  'addColor': addColor
};

//DECLARE COLORS
var red = new PColor('RED', 'red', '#FF0000', pColors);
var blue = new PColor('BLUE', 'blue', '#0000FF', pColors);
var yellow = new PColor('YELLOW', 'yellow', '#FFFF00', pColors);

var green = new PColor('GREEN', 'green', '#008000', pColors);
var purple = new PColor('PURPLE', 'purple', '#800080', pColors);
var orange = new PColor('ORANGE', 'orange', '#FFA500', pColors);
var indigo = new PColor('INDIGO', 'indigo', '#9A0036', pColors);

var white = new PColor('WHITE', 'white', '#FFFFFF', pColors);
var black = new PColor('BLACK', 'black', '#000000', pColors);

this.exports = pColors;