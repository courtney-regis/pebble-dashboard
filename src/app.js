/**
 * Pebble Dashboard
 * author: sigerco
 * 
 * Description: App to access different locaton based information
 */

var UI = require('ui');

//GLOBAL MODULES
var pColors = require('pColors');
var pConstants = require('pConstants');
var pAppList = require('pAppList');

var main = new UI.Card({
  title: 'Welcome to Pebble Dashboard',
  icon: '',
  subtitle: '',
  body: '\nPush select button for options',
  subtitleColor: pColors.BLACK.named, // Named colors
  bodyColor: pColors.BLACK.named // Hex colors
});

main.show();

main.on(pConstants.ACTION.CLICK_ACTION, pConstants.BUTTON.SELECT_BUTTON, function(e) {
  
  var menuItems = [];
  for(var i = 0; i < pAppList.appList.length; i++)
  {    
      menuItems.push({
        title: pAppList.appList[i].appName,
        subtitle: pAppList.appList[i].appDescription,
        applicationId: pAppList.appList[i].appId
      });
  }
   
  var appsMenu = new UI.Menu({
  sections: [{
      title: 'Dashboard Menu',
      items: menuItems
      }]
  });
  
  // Show the Menu
  appsMenu.show();  
  
  appsMenu.on(pConstants.BUTTON.SELECT_BUTTON, function(e) {
    for(var i = 0; i < pAppList.appList.length; i++)
    {   
      if(e.item.applicationId === pAppList.appList[i].appId && typeof pAppList.appList[i].app.execute == 'function')
      {
         pAppList.appList[i].app.execute();
      }
    }    
  });  
});