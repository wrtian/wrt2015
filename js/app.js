API_DIGEST = 'none';
Storage = $.localStorage;

function ConfigApi(u)
{
	if(u != undefined) {
		Storage.set('APIURL', u);
	} else {
		u = Storage.get('APIURL');
	}
	
	return {
		'URL_API' : u
		,'URL_PULSE' :	u +'/'
		,'URL_AUTHENTICATE' : u +'/authenticate'
		,'URL_PLAYERINFO' : u +'/playerinfo'
		,'URL_PLAYERUPDATE' : u +'/playerinfo'
		
		,'URL_GETCURRENCIES' : u +'/getcurrencies'
		,'URL_LOGOUT' :	u +'/logout'
	};
};

//ConfigApi('http://localhost:8080/a/wrt2015/api');

$.ajaxSetup({
	beforeSend: addHeaders
});


function addHeaders(xhr) {
	xhr.setRequestHeader('auth-token', API_DIGEST);
//	xhr.setRequestHeader('with-credentials', true);
//	xhr.setRequestHeader('Cookie', "PHPSESSID=rvrg3tii16gmpnr1e6sb2dvi13");
	xhr.withCredentials = true;
//	xhr.dataType ='jsonp';
}

$(function() {
	API_DIGEST = Storage.get('TOKEN');
	
	$.notify.defaults({globalPosition: 'top left', 'className':'info'});
	if($('body').attr('id') != 'index')
	{
		$.get( ConfigApi().URL_PULSE).done(
			function(r) {
				if(r.status != 200)
					location.href = 'index.html';
			}
		);
	}

	$("#logout").on("touchstart",function(){
		$.get( ConfigApi().URL_LOGOUT)
		.done(function(r) {
			Storage.remove('TOKEN');
			location.href = 'index.html';
		});
		
		return false;
	});
	
});
