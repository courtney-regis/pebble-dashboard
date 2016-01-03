var pHTTP = require('pHTTP');
var UI = require('ui');
var Vector2 = require('vector2');
var Accel = require('ui/accel');
var Vibe = require('ui/vibe');

var pColors = require('pColors');
var pText = require('pText');
var pConstants = require('pConstants');

var PREFIX_BASE_URL = 'http://api.openweathermap.org/data/2.5/forecast?';
var LAT_BASE_URL = 'lat=';
var LONG_BASE_URL = '&lon=';
var SUFFIX_BASE_URL = '&appid=';
var degreeSymbol = '\xB0';

Accel.init();
var locationWatcher;

var defaultParams = 
{
  'API_KEY': 'f58fbca2dc684945fdf19450bfe963f9',
  'LATITUDE': '0',
  'LONGITUDE': '0'
};
var runtimeParams = {};

var geoLocationSuccessHandler = function(pos) {
  console.log('lat= ' + pos.coords.latitude + ' lon= ' + pos.coords.longitude);
  
  runtimeParams = defaultParams;
  runtimeParams.LATITUDE = pos.coords.latitude;
  runtimeParams.LONGITUDE = pos.coords.longitude;
};

var geoLocationErrorHandler = function(err) {
  console.log('location error (' + err.code + '): ' + err.message);
  runtimeParams = defaultParams;
};

var locationOptions = 
{
  timeout: 15000, 
  maximumAge: 60000
};

Pebble.addEventListener('ready', function(e) {
  locationWatcher = navigator.geolocation.watchPosition(geoLocationSuccessHandler, geoLocationErrorHandler, locationOptions);
});

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

var getWeatherInformation = function()
{  
  var additionalOptions = new pHTTP.AdditionalOptions('json', true); 
  var url = PREFIX_BASE_URL + 
      LAT_BASE_URL + runtimeParams.LATITUDE  + 
      LONG_BASE_URL + runtimeParams.LONGITUDE + 
      SUFFIX_BASE_URL + runtimeParams.API_KEY;
  
  console.log('Fetching Weather details from url: [' + url + ']');  
  pHTTP.GET(url, pWeatherSuccessHandler, pWeatherFailureHandler, additionalOptions);
};

var pWeatherFailureHandler = function(data) {
  // Success!
  console.log('Failed to fetch weather data!'); 
};

var pWeatherSuccessHandler = function(data) {
  // Success!
  console.log('Successfully fetched weather data!');
  Vibe.vibrate('short');
  
  var parseFeed = function(data, quantity) {
    var items = [];
    for(var i = 0; i < quantity; i++) {
      // Always upper case the description string
      var title = data.list[i].weather[0].main;
      
      var temperature = Math.round(data.list[i].main.temp - 273.15) + degreeSymbol + 'C';
      title = title.charAt(0).toUpperCase() + title.substring(1) + ' - ' + temperature;
  
      // Get date/time substring
      //var time = data.list[i].dt_txt;
      //time = time.substring(time.indexOf('-') + 1, time.indexOf(':') + 3);

      var timeDate = new Date(data.list[i].dt*1000);
      var time = timeDate.getDate() + '/' +  
          (timeDate.getMonth() + 1) + ' - ' +
          (timeDate.getHours()) + ':' +
          (('0' + timeDate.getMinutes()).slice(-2));
      
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
  
  // Add an action for SELECT
  resultsMenu.on(pConstants.BUTTON.SELECT_BUTTON, function(e) {
    // Get that forecast
    var forecast = data.list[e.itemIndex];
  
    // Assemble body string
    var content = data.list[e.itemIndex].weather[0].description;
  
    // Capitalize first letter
    content = content.charAt(0).toUpperCase() + content.substring(1);
  
    // Add temperature, pressure etc
    content += '\nTemperature: ' + Math.round(forecast.main.temp - 273.15) + '°C' + '\nPressure: ' + Math.round(forecast.main.pressure) + ' mbar' +
      '\nWind: ' + Math.round(forecast.wind.speed) + ' mph, ' + 
      Math.round(forecast.wind.deg) + degreeSymbol;
      
    var detailCard = new UI.Card({
      title:'Details',
      subtitle: e.item.subtitle,
      body: content
    });
    
    detailCard.show();
    
  });  
  
  // Register for 'tap' events
  resultsMenu.on('accelTap', function(e) {
    // Make another request to openweathermap.org  
    getWeatherInformation();
  });
};

var execute = function()
{
  splashWindow.add(splashWindowText);
  splashWindow.show();
  getWeatherInformation();
};

var pWeather = {
  'execute': execute
};

this.exports = pWeather;