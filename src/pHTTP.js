var ajax = require('ajax');

var pHTTP = {
  'AdditionalOptions': function(type, crossDomain)
  {
    this.type = type;
    this.crossDomain = crossDomain;
  },
  
  'GET': function(url, successCallback, failureCallback, additionalOptions)
  {
    return ajax(
      {
        url: url,
        method: 'GET',
        type: additionalOptions.type
      },
      successCallback,
      failureCallback
    );
  },
  
  'POST': function(url, successCallback, failureCallback, data, additionalOptions)
  {
    return ajax(
      {
        url: url,
        method: 'POST',
        data: data,        
        type: additionalOptions.type,
        crossDomain: additionalOptions.crossDomain
      },
      successCallback,
      failureCallback
    );
  }
};

this.exports = pHTTP;