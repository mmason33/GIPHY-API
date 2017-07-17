// api key dc6zaTOxFJmzC
// host api.giphy.com
// search cat http://api.giphy.com/v1/stickers/search?q=cat&api_key=dc6zaTOxFJmzC
var res;

function api () {


	$.ajax({
		url: 'http://api.giphy.com/v1/stickers/search?q=cat&api_key=dc6zaTOxFJmzC',
		method: 'GET'

	}).done(function(result){

		res = result;
		console.log(res);
	});

}

api();
