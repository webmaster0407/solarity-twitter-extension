 

window.addEventListener('RecieveContent', function(evt) {

	if (evt.detail=="connect-wallet") {

		try {

			(async () => {
				const resp = await window.solana.connect();
				var event = new CustomEvent('RecieveWallate', {detail: { 'msg': "recieve-wallet", 'address': resp.publicKey.toString() }});
				window.dispatchEvent(event);
			})(); 

		} catch (err) {
			var event = new CustomEvent('RecieveWallate', {detail: { 'msg': "recieve-wallet", 'address': 'ERROR##' }});
			window.dispatchEvent(event);
		}	

	}
	

});
