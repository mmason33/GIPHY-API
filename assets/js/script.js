// api key dc6zaTOxFJmzC
// host api.giphy.com
// search cat https://api.giphy.com/v1/stickers/search?q=cat&api_key=dc6zaTOxFJmzC
// style="background:url(${res.data[i].images.fixed_height.url}) no-repeat center center; background-size:cover;"


function api (searchTerm , page) {

	let res;
	let query =  `https://api.giphy.com/v1/stickers/search?q=${searchTerm}&api_key=dc6zaTOxFJmzC&offset=${page}`;
	$.ajax({
		url: query,
		method: 'GET'

	}).done(function(result){

		res = result;
		console.log(res, query);

		for (let i = 0; i < res.data.length; i++) { 

			$('.gifs-returned-row').append(
				'<div class="col-md-4 text-center">' +
					`<div class="gif" id="${i}" style="background:url(${res.data[i].images.fixed_height.url}) no-repeat center center; background-size:cover;"></div>` +
					`<a href="#" class="gif-link-view btn btn-primary">View</a>` +
					`<a href="${res.data[i].images.fixed_height.url}" class="gif-link btn btn-primary" download>Download</a>` +
				'</div>'
			);

		}

		$('.load').removeClass('hide');


		$('.gif').hover( function () {

			let id = $(this).attr("id");

			if ($(this).hasClass('playing') === false) {
				$(this).addClass('playing');
				$(this).css({'background':'url('+ res.data[id].images.fixed_height.url +') no-repeat center center', 'background-size': 'cover'});
			} else if ($(this).hasClass('playing') === true) {
				$(this).removeClass('playing');
				$(this).css({'background':'url('+ res.data[id].images.fixed_height_still.url +') no-repeat center center', 'background-size': 'cover'});
			}

		});	

		$('.gif-link-view').click( function () {
			console.log($(this).siblings('.gif').hasClass('gif-view') === false);
			if ($(this).siblings('.gif').hasClass('gif-view') === false) {
				$(this).parent('.col-md-4').removeClass('col-md-4');
				$('.col-md-4').fadeOut();

				setTimeout(() => {

					$(this).siblings('.gif').addClass('gif-view');
					$(this).text('Back');

				}, 500);
			} else {
				$(this).parent().addClass('col-md-4');
				$(this).siblings('.gif').removeClass('gif-view');
				$(this).text('View');
				$('.col-md-4').fadeIn();
			    $('html, body').animate({
			        scrollTop: $(this).parent().offset().top
			    }, 600);
			}	

		});


	});

}

$(document).ready(function () {

		    $(window).scroll(function () {
		        if ($(this).scrollTop() > 100) {
		            $('.scrollup').fadeIn();
		        } else {
		            $('.scrollup').fadeOut();
		        }
		    });

			$('#gif-button').click( function (e) {

						e.preventDefault();
						$('.gifs-returned-row').empty();
						let searchTerm = $('#gif-search').val().replace(/ /g, '+');
						let page = 0;
						api(searchTerm, page);
						console.log(searchTerm);

						setTimeout( function () {

								$('.scrollup').click( function (e) {

									e.preventDefault();
									$('.gifs-returned-row').empty();
									page += 25;
									api(searchTerm, page)

			
								        $("html, body").animate({
								            scrollTop: 0
								        }, 1000);
							

								});


						}, 500);

			});


});
