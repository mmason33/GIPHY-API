// api key dc6zaTOxFJmzC
// host api.giphy.com
// search cat http://api.giphy.com/v1/stickers/search?q=cat&api_key=dc6zaTOxFJmzC
//style="background:url(${res.data[i].images.fixed_height.url}) no-repeat center center; background-size:cover;"

function api (searchTerm , page) {

	let res;

	$.ajax({
		url: `http://api.giphy.com/v1/stickers/search?q=${searchTerm}&api_key=dc6zaTOxFJmzC&offset=${page}`,
		method: 'GET'

	}).done(function(result){

		res = result;
		res.pagination.offset = page;
		console.log(res);

		for (let i = 0; i < res.data.length; i++) { 

			$('.gifs-returned-row').append(
				'<div class="col-md-4 text-center">' +
					`<div class="gif" style="background:url(${res.data[i].images.fixed_height.url}) no-repeat center center; background-size:cover;"></div>` +
					`<a href="${res.data[i].url} class="gif-link btn btn-primary">View GIF</a>` +
				'</div>'
			);

		}
		if (res.pagination.offset === 0) {
			$('.gifs-returned').append('<button class="load btn btn-primary">Load More</button>');
		}
	});

}

$('#gif-button').click( function (e) {

	e.preventDefault();
	
	let searchTerm = $('#gif-search').val();
	let page = 0;
	api(searchTerm, page);
	setTimeout( function () {

		$('.load').click( function (e) {
			e.preventDefault();
			page += 26;
			api(searchTerm, page)

		});

	}, 500);

});