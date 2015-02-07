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
		,'URL_PLAYERFIND' : u +'/playersearch'
		,'URL_PLAYERUPDATE' : u +'/playerupdate'
		,'URL_TABLESTATUS' : u +'/tablestatus'
		,'URL_TABLESCORES' : u +'/tablescores'
		,'URL_LEADERBOARD' : u +'/leaderboards'
		,'URL_PAYMENTS' : u +'/payments'
		,'URL_ROUNDS' : u +'/rounds'
		,'URL_GETCURRENCIES' : u +'/getcurrencies'
		,'URL_LOGOUT' :	u +'/logout'
	};
};
$.support.cors=true;
$.ajaxSetup({
	beforeSend: addHeaders,	
	error: defaultError
});

function(jqXHR, exception) {

	if (jqXHR.status === 0) {
		alert('Not connect.\n Verify Network.');
	} else if (jqXHR.status == 404) {
		alert('Requested page not found. [404]');
	} else if (jqXHR.status == 500) {
		alert('Internal Server Error [500].');
	} else if (exception === 'parsererror') {
		alert('Requested JSON parse failed.');
	} else if (exception === 'timeout') {
		alert('Time out error.');
	} else if (exception === 'abort') {
		alert('Ajax request aborted.');
	} else {
		alert('Uncaught Error.\n' + jqXHR.responseText);
	}
}

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
