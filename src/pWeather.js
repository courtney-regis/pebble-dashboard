var pHTTP = require('pHTTP');
var UI = require('ui');

var defaultParams = 
{
  'API_KEY': 'f58fbca2dc684945fdf19450bfe963f9',
  'LOCATION': 'London
};

var execute = function(menu, params)
{
  var runtimeParams = {};
  if(!params)
  {
      runtimeParams = defaultParams;
  }
  else
  {
      runtimeParams = params;    
  }
  
  
}

var pWeather = {
  'PREFIX_BASE_URL': 'http://api.openweathermap.org/data/2.5/weather?q='
  'SUFFIX_BASE_URL': '&appid=',
  'execute': execute
};

this.exports = pWeather;