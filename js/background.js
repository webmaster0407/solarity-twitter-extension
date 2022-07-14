var version = "2.0";
var uiSettings = {

};

var twitterApp = {
  onExtMessage: function(message, sender, sendResponse){ 
    twitterApp.message = message;
    switch (message.command) {
      case "getInfoByWalletAddress":
      twitterApp.getInfoByWalletAddress(message.data, sender, sendResponse)
      break;
    }
    return true;
  },
  
  getInfoByWalletAddress:function(address,sender, sendResponse){
    $.ajax({
      method: "GET",
      url: consts.getUserInfo+address,
      success:function(response) {
        sendResponse({
          'success':true,
          "response" : response.user.rooms,
          "username" : response.user.username
        });
      },
      error:function(response) {
        sendResponse({
          'success':false,
          "response" : response.responseJSON.message
        });

      }
    });

  }  

};

chrome.runtime.onMessage.addListener(twitterApp.onExtMessage);
//twitterApp.load();

function sendMessage1(msg, callbackfn) {
  if(callbackfn!=null) {
    callback.push(callbackfn);
    msg.callback = "yes";
  }
  chrome.runtime.sendMessage(msg,callbackfn);
}

function sendMessage(tabId, msg){
  if(tabId) chrome.tabs.sendMessage(tabId, msg);
  else chrome.runtime.sendMessage(sender.id, msg);
}

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    sendMessage(tabId, {"command": "initTwitterBtns"});
   
}); 


