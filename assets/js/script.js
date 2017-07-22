var giphy = () => {
	return {
		response: [],
		gifIndex: 0,
		offset: 0,
		searchTerm: '',
		handleSubmit (e) {
			if ($(this).val() !== '') {
				gif.offset = 0;
				e.preventDefault();
				$('.gifs-returned-row').empty();
				gif.searchTerm = $('#gif-search').val().replace(/ /g, '+');
				gif.api(gif.searchTerm, gif.offset);
				console.log(gif.searchTerm);
			}
		},
		api (searchTerm, offset) {
			let query =  `https://api.giphy.com/v1/gifs/search?q=${searchTerm}&api_key=dc6zaTOxFJmzC&offset=${offset}`;
			$.ajax({
				url: query,
				method: 'GET'

			}).done(function(result){
				console.log(query);
				for (let i = 0; i < result.data.length; i++) { 
					gif.response.push(result.data[i]);
					gif.gifIndex = gif.response.indexOf(result.data[i]);
					$('.gifs-returned-row').append(
						'<div class="col-lg-4 col-md-12 text-center animated zoomIn">' +
							`<div class="gif" data-gif="${gif.gifIndex}" style="background:url(${gif.response[gif.gifIndex].images.fixed_height_still.url}) no-repeat center center; background-size:cover;"></div>` +
							`<a href="${gif.response[gif.gifIndex].images.fixed_height.url}" class="gif-link btn btn-primary" download><i class="fa fa-download" aria-hidden="true"></i></a>` +
							`<p>Rating: ${result.data[i].rating}</p>` +

						'</div>'
					);
				}
				$('.gif').hover(gif.handleHover);
				$(window).on( 'scroll', gif.lazyLoad);
				$(window).scroll(gif.smoothScroll);
				$('.top').click(gif.toTop);
			});
		},
		handleHover () {
			let id = $(this).attr('data-gif');
			if ($(this).hasClass('playing') === false) {
				$(this).addClass('playing');
				$(this).css({'background':'url('+ gif.response[id].images.fixed_height.url +') no-repeat center center', 'background-size': 'cover'});
			} else if ($(this).hasClass('playing') === true) {
				$(this).removeClass('playing');
				$(this).css({'background':'url('+ gif.response[id].images.fixed_height_still.url +') no-repeat center center', 'background-size': 'cover'});
			}
		},
		lazyLoad () {
			var hT = $('.gif').last().offset().top;
			var hH = $('.gif').last().outerHeight();
			var wH = $(window).height();
			var wS = $(window).scrollTop();
			var diff = (hT + hH) - wH;
			if (wS > diff && $('.gif').hasClass('gif-view') !== true) {
				$(window).off();
				gif.offset += 25;
				gif.api(gif.searchTerm, gif.offset)
			}
		},
		smoothScroll () {
			if ($(this).scrollTop() > 100) {
			    $('.top').fadeIn();
			} else {
			    $('.top').fadeOut();
			}
		},
		toTop () {
			$("html, body").stop(true, false).animate({
			    scrollTop: 0
			}, 1000);
		}
	}	
}

const gif = giphy();

$(document).ready(function () {
	$('#gif-button').click(gif.handleSubmit);
});
