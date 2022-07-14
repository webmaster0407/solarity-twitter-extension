 var s = document.createElement('script');
 s.src = chrome.runtime.getURL('contentscript/script.js');
 s.onload = function() {
 	this.remove();
 };
 (document.head || document.documentElement).appendChild(s);

  $('body').append(`<a href="javascript:;" class="btn" id="hidden-content-1" style="display:none">
 	<div class="modal-container">
 	
 	<div class="container-copy">
 	<div id="inviteCode" class="invite-page">
 	<input id="copy-wallate-link" value="wallet address" readonly>
 	<div id="copy">
 	<i class="fa fa-clipboard" aria-hidden="true" data-copytarget="#copy-wallate-link">
 	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-copytarget="#copy-wallate-link"><path d="M320 96V80C320 53.49 298.5 32 272 32H215.4C204.3 12.89 183.6 0 160 0S115.7 12.89 104.6 32H48C21.49 32 0 53.49 0 80v320C0 426.5 21.49 448 48 448l144 .0013L192 176C192 131.8 227.8 96 272 96H320zM160 88C146.8 88 136 77.25 136 64S146.8 40 160 40S184 50.75 184 64S173.3 88 160 88zM416 128v96h96L416 128zM384 224L384 128h-112C245.5 128 224 149.5 224 176v288c0 26.51 21.49 48 48 48h192c26.51 0 48-21.49 48-48V256h-95.99C398.4 256 384 241.6 384 224z"/></svg></i>

 	</div>
 	</div>
 	</div>
 	</div></a>`)



 $('#copy').on('click', function(event) {
 	console.log(event);
 	copyToClipboard(event);
 });


 function copyToClipboard(e) {
 	var
 	t = $('#copy i'), 
 	c = '#copy-wallate-link',
 	inp = (c ? document.querySelector(c) : null);
 	console.log(inp);

 	if (inp && inp.select) {

 		inp.select();
 		try {

 			document.execCommand('copy');
 			inp.blur();

 			t.addClass('copied');
 			setTimeout(function() {
 				t.removeClass('copied');
 				  setTimeout(function(){
        			//location.reload();
      			},1000)
 			}, 1500);
 		} catch (err) {

 			alert('please press Ctrl/Cmd+C to copy');
 		}

 	}

 }