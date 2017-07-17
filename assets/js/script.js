// api key dc6zaTOxFJmzC
// host api.giphy.com
// search cat https://api.giphy.com/v1/stickers/search?q=cat&api_key=dc6zaTOxFJmzC
//style="background:url(${res.data[i].images.fixed_height.url}) no-repeat center center; background-size:cover;"

function api (searchTerm , page) {

	let res;

	$.ajax({
		url: `https://api.giphy.com/v1/stickers/search?q=${searchTerm}&api_key=dc6zaTOxFJmzC&offset=${page}`,
		method: 'GET'

	}).done(function(result){

		res = result;
		console.log(res);

		for (let i = 0; i < res.data.length; i++) { 

			$('.gifs-returned-row').append(
				'<div class="col-md-4 text-center">' +
					`<div class="gif" id="${i}"style="background:url(${res.data[i].images.fixed_height_still.url}) no-repeat center center; background-size:cover;"></div>` +
					`<a href="${res.data[i].url}" class="gif-link btn btn-primary">View GIF</a>` +
				'</div>'
			);

		}
		if (res.pagination.offset === 0) {
			$('.gifs-returned').append('<button class="load btn btn-primary">Load More</button>');
		}

		$('.gif').click( function () {
			let id = $(this).attr("id");

			if ($(this).hasClass('playing') === true) {
				$(this).remove('playing');
				$(this).css('background', 'url('+ res.data[id].images.fixed_height_still.url +')');
			} else {
				$(this).addClass('playing');
				$(this).css('background', 'url('+ res.data[id].images.fixed_height.url +')');
			}
		});	
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
			$('.gifs-returned-row').empty();
			// $('.load').remove();
			page += 25;
			api(searchTerm, page)

		});

	}, 500);

});