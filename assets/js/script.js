// api key dc6zaTOxFJmzC
// host api.giphy.com
// search cat http://api.giphy.com/v1/stickers/search?q=cat&api_key=dc6zaTOxFJmzC


function api (searchTerm) {

	let res;

	$.ajax({
		url: `http://api.giphy.com/v1/stickers/search?q=${searchTerm}&api_key=dc6zaTOxFJmzC`,
		method: 'GET'

	}).done(function(result){

		res = result;
		console.log(res);

		for (let i = 0; i < res.data.length; i++) { 

			$('.gifs-returned-row').append(
				'<div class="col-md-4">' +
					`<div class="gif" style="background:url(${res.data[i].images.fixed_height.url}) no-repeat center center; background-size:cover;"></div>` +
				'</div>'
			);

		}


	});

}



$('#gif-button').click( function (e) {

	e.preventDefault();
	
	let searchTerm = $('#gif-search').val();

	api(searchTerm);

});