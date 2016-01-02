/**
 * Welcome to Pebble.js!
 *
 * This is where you write your app.
 */

var UI = require('ui');
var Vector2 = require('vector2');
var ajax = require('ajax');

var UP_BUTTON = 'up';
var DOWN_BUTTON = 'down';
var SELECT_BUTTON = 'select';
var CLICK_ACTION = 'click';

var main = new UI.Card({
  title: 'Pebble Dashboard',
  icon: '',
  subtitle: '',
  body: 'Toggle up or down for additional options',
  subtitleColor: 'indigo', // Named colors
  bodyColor: '#9a0036' // Hex colors
});

main.show();

main.on(CLICK_ACTION, SELECT_BUTTON, function(e) {
  var wind = new UI.Window({
    fullscreen: true,
  });
  var textfield = new UI.Text({
    position: new Vector2(0, 65),
    size: new Vector2(144, 30),
    font: 'gothic-24-bold',
    text: 'Text Anywhere!',
    textAlign: 'center'
  });
  wind.add(textfield);
  wind.show();
});
