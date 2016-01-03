var pHTTP = require('pHTTP');
var UI = require('ui');
var Vector2 = require('vector2');

var pColors = require('pColors');
var pText = require('pText');

var PREFIX_BASE_URL = 'http://api.openweathermap.org/data/2.5/forecast?q=';
var SUFFIX_BASE_URL = '&appid=';
var degreeSymbol = '\xB0';

var defaultParams = 
{
  'API_KEY': 'f58fbca2dc684945fdf19450bfe963f9',
  'LOCATION': 'London'
};

var splashWindow = new UI.Window();

// Text element to inform user
var splashWindowText = new UI.Text({
  position: new Vector2(0, 0),
  size: new Vector2(144, 168),
  text: 'Downloading weather data...',
  font: pText.FONT.GOTHIC_28_BOLD,
  color: pColors.BLACK.named,
  textOverflow:'wrap',
  textAlign: pText.ALIGNMENT.CENTER,
  backgroundColor: pColors.WHITE.named
});

var pWeatherSuccessHandler = function(data) {
  // Success!
  console.log('Successfully fetched weather data!');

  var parseFeed = function(data, quantity) {
    var items = [];
    for(var i = 0; i < quantity; i++) {
      // Always upper case the description string
      var title = data.list[i].weather[0].main;
      
      var temperature = Math.round(data.list[i].main.temp - 273.15) + degreeSymbol + 'C';
      title = title.charAt(0).toUpperCase() + title.substring(1) + ' - ' + temperature;
  
      // Get date/time substring
      //var time = data.list[i].dt_txt;
      var time = new Date(data.list[i].dt*1000).toString();
      //time = time.substring(time.indexOf('-') + 1, time.indexOf(':') + 3);
      
      // Add to menu items array
      items.push({
        title:title,
        subtitle:time
      });
    }

    // Finally return whole array
    return items;
  };

  var menuItems = parseFeed(data, 10);

  var resultsMenu = new UI.Menu({
  sections: [{
    title: 'Current Forecast: ',
      items: menuItems
    }]
  });
  
  resultsMenu.show();
  splashWindow.hide();
};

var pWeatherFailureHandler = function(data) {
  // Success!
  console.log('Failed to fetch weather data!'); 
};

var execute = function()
{
  splashWindow.add(splashWindowText);
  splashWindow.show();

  var runtimeParams = defaultParams;  
  var additionalOptions = new pHTTP.AdditionalOptions('json', true);
  
  var url = PREFIX_BASE_URL + runtimeParams.LOCATION + SUFFIX_BASE_URL + runtimeParams.API_KEY;
  console.log('Fetching Weather details from url: [' + url + ']');
  
  pHTTP.GET(url, pWeatherSuccessHandler, pWeatherFailureHandler, additionalOptions);
};

var pWeather = {
  'execute': execute
};

this.exports = pWeather;