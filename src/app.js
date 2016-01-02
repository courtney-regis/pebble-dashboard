/**
 * Welcome to Pebble.js!
 *
 * This is where you write your app.
 */

var UI = require('ui');
var Vector2 = require('vector2');

//GLOBAL MODULES
var pHTTP = require('pHTTP');
var pColors = require('pColors');
var pConstants = require('pConstants');
var pText = require('pText');

//APPS
var pTransit = require('pTransit');
var pWeather = require('pWeather');

var main = new UI.Card({
  title: 'Pebble Dashboard',
  icon: '',
  subtitle: '',
  body: '\nToggle up or down for options',
  subtitleColor: pColors.BLACK.named, // Named colors
  bodyColor: pColors.BLACK.named // Hex colors
});

main.show();

main.on(pConstants.ACTION.CLICK_ACTION, pConstants.BUTTON.SELECT_BUTTON, function(e) {
  var wind = new UI.Window({
    fullscreen: true
  });
  
  var textField = new UI.Text({
    position: new Vector2(0, 65),
    size: new Vector2(144, 30),
    font: pText.FONT.GOTHIC_BOLD,
    text: 'Text Anywhere!',
    textAlign: pText.ALIGNMENT.CENTER
  });
  
  wind.add(textField);
  wind.show();
});
