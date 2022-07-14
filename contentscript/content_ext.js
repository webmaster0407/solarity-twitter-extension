var callback=[];
var counter = 0;
var myTwitterPage = {
  interval_state : "",
  uiSettings : {},
  load:function(){

    myTwitterPage.startchekingTwitter();
  },
  onExtMessage: function(message, sender, sendResponse){
    myTwitterPage.message = message;
    switch (message.command) {
      case "initTwitterBtns":
      $('[tweet-consider="1"]').removeAttr('tweet-consider');
      var injectNode = $('a[href$="/header_photo"]');
      $(injectNode).children().show();
      $('.slider').remove();
      $('.modal-container ul').remove();
      break;

    }
  },
  parseUsername:function (url)
  {
    let output = url;
    let matches;

    // Parse username
    matches = url.match(/(?:https?:\/\/)?(?:www.)?(?:twitter|medium|facebook|vimeo|instagram)(?:.com\/)?([@a-zA-Z0-9-_]+)/im);

    // Set output
    output = matches.length ? matches[1] : output;

    return output;
  },
  addTwitterBtn: function(message, sender, sendResponse){
   var twitContainer = $('nav[aria-label="Profile timelines"]');
   $(twitContainer).each(function () {
    var tweetContainer = $(this).closest('div[data-testid="primaryColumn"]');
    if (tweetContainer.attr('tweet-consider') != '1') {
      tweetContainer.attr('tweet-consider', 1);
      var connectWalletWrapper = $('<div style="text-align: right; position: absolute;right: 300px;"><a  href="javascript:;" class="buttonRoomTwitter">Room</a></div>');
      $(connectWalletWrapper).click(function (e) {
        var twitter_name = myTwitterPage.parseUsername(location.href);
        if ($('.modal-container ul li').length != 0) {
          myTwitterPage.initModalBox();
        }else{
          $('body').append('<div class="loading"></div>');
          myTwitterPage.getUserInfo(twitter_name);
          myTwitterPage.initModalBox(); 
        }
      });

      var A = tweetContainer.find('div[data-testid="placementTracking"]');
      A.prepend(connectWalletWrapper); 

       
      var twitter_name = myTwitterPage.parseUsername(location.href)
      myTwitterPage.getUserInfo(twitter_name);  
    }
  });

 },  
 
 initEvents:function(){

   $('a[href$="/header_photo"]').on('click', function(e) {
     e.preventDefault(); 
   });

   $('.buttonRoomSolana').off().on('click', function(e) {
    var vr = $(this).attr('vr');
    $.fancybox.close();
    $('.modal-container ul li').removeClass('room-selected');
    $(this).closest('li').addClass('room-selected');
    myTwitterPage.showVrBanner(vr);
  });



 },
 getUserInfo:function(twitter_name){
  
  sendMessage({"command": "getInfoByWalletAddress","data":twitter_name},function(result){
    $('body').find('.loading').remove();
    if (result.success) {
      var data=result.response;
      var list = `<ul class="list-group">`;
      for (var i = 0; i < data.length; i++) {
        var VR = consts.roomVR+result.username+'/room/'+i;
        var title = data[i]['title'];
        var selcted_room = i == 0 ? 'room-selected' : '';
        var roomVrFrame = `<a  href="javascript:;" class="buttonRoomSolana" vr=`+VR+`>`+title+`</a>`;
        list +=`<li class="`+selcted_room+`">`+roomVrFrame+`</li>`
      }

      if (data.length != 0) {
        list +=`</ul>`;
        $('.modal-container').html(list);
        var defaultRoom = $('.modal-container ul li:eq(0)').find('a').attr('vr');
        myTwitterPage.showVrBanner(defaultRoom);
      }else{
        var errorHtml = `<h4><strong><a href="https://solarity-web-git-master-hassan-sk.vercel.app/" target="_blank">Create a profile on our website</a></strong></h4>
        <div class="error">You don't have rooms available!!</div>`;
        $('.modal-container').html(errorHtml);  
      }
    }else{
      var errorHtml = `<h4><strong><a href="https://solarity-web-git-master-hassan-sk.vercel.app/" target="_blank">Create a profile on our website</a></strong></h4>
      <div class="error">`+result.response+`</div>`;
      $('.modal-container').html(errorHtml);
    }
    //myTwitterPage.initModalBox();  
    myTwitterPage.initEvents();    
  })

},
showVrBanner:function(vr){
  var VR = vr;
  
  var vrFrame=`<iframe frameborder="0" vspace="0" hspace="0" webkitallowfullscreen="" mozallowfullscreen="" allowfullscreen="" allowtransparency="true" src="`+VR+`"  id="vr-frame" scrolling="no" width="100%" height="100%"></iframe>`;
  
  var carousel= `<div class="slider">
  <ul><li class="c"> `+vrFrame+` </li></ul></div>`;
  //show room crausal here
  var injectNode = $('a[href$="/header_photo"]');
  $('.slider').remove();
  $(injectNode).children().hide();
  injectNode.prepend(carousel)
  myTwitterPage.initEvents()

},
initModalBox:function(){
  $.fancybox.open({
    src  : '#hidden-content-1',
    type : 'inline',
    opts : {
      afterShow : function( instance, current ) {
        console.info('done!');
      }
    }
  });

},
startchekingTwitter: function(){
  const isPageFocused = document.visibilityState == "visible" ? true : false;

  if ( isPageFocused == true ) {
    myTwitterPage.addTwitterBtn();
  }    
  setTimeout(function(){
    myTwitterPage.startchekingTwitter();
  }, 1500);

}


};

chrome.runtime.onMessage.addListener(myTwitterPage.onExtMessage);

window.addEventListener('RecieveWallate', function(evt) {
  if (evt.detail.msg=="recieve-wallet") {
    localStorage.setItem('wallet-address',evt.detail.address);
    $.fancybox.close();
    myTwitterPage.getUserInfo()

  }


})
$(document).ready(function(){
  setTimeout(function(){
    myTwitterPage.load();    
  },2000);
});

function sendMessage(msg, callbackfn) {
  if(callbackfn!=null) {
    callback.push(callbackfn);
    msg.callback = "yes";
  }
  chrome.runtime.sendMessage(msg,callbackfn);
}

