var pTransit = require('pTransit');
var pWeather = require('pWeather');

var PApp = function(appId, appName, appDescription, app)
{
  this.appId = appId;
  this.appName = appName;
  this.appDescription = appDescription;
  this.app = app;
};

var appId = 0;
var pAppList = {};
var pAppListArray = 
[
    new PApp(appId++, 'Pebble Transit', 'Displays transit information based on location', pTransit),
    new PApp(appId++, 'Pebble Weather', 'Displays weather information based on location', pWeather)  
];

pAppList.appList = pAppListArray;
console.log('Registered Apps: [' + pAppList.appList + ']');

this.exports = pAppList;