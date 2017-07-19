// api key dc6zaTOxFJmzC
// host api.giphy.com
// search cat https://api.giphy.com/v1/stickers/search?q=cat&api_key=dc6zaTOxFJmzC
// style="background:url(${res.data[i].images.fixed_height.url}) no-repeat center center; background-size:cover;"

var giphy = () => {
	return {

			response: [],
			gifIndex: 0,
			offset: 0,
			searchTerm: '',

			handleSubmit (e) {

				console.log(this);
				e.preventDefault();
				$('.gifs-returned-row').empty();
				gif.searchTerm = $('#gif-search').val().replace(/ /g, '+');
				gif.api(gif.searchTerm, gif.offset);


			},

			api (searchTerm, offset) {

				let query =  `https://api.giphy.com/v1/stickers/search?q=${searchTerm}&api_key=dc6zaTOxFJmzC&offset=${offset}`;
				$.ajax({
					url: query,
					method: 'GET'

				}).done(function(result){

					console.log(query);

					for (let i = 0; i < result.data.length; i++) { 

						gif.response.push(result.data[i]);
						gif.gifIndex = gif.response.indexOf(result.data[i]);

						$('.gifs-returned-row').append(
							'<div class="col-md-4 col-sm-12 text-center">' +
								`<div class="gif" data-gif="${gif.gifIndex}" style="background:url(${gif.response[gif.gifIndex].images.fixed_height_still.url}) no-repeat center center; background-size:cover;"></div>` +
								`<a href="#" class="gif-link-view btn btn-primary">View</a>` +
								`<a href="${gif.response[gif.gifIndex].images.fixed_height.url}" class="gif-link btn btn-primary" download>Download</a>` +
							'</div>'
						);

					}

					$('.gif').hover(gif.handleHover);

					$('.gif-link-view').click(gif.handleViewClick);

					$(window).on( 'scroll', gif.lazyLoad);

					$(window).scroll(gif.smoothScroll);

					$('.top').click(gif.toTop);


				});

			},


			handleHover () {

				let id = $(this).attr('data-gif');

				if ($(this).hasClass('playing') === false && $(this).hasClass('.gif-view') === false) {
					$(this).addClass('playing');
					$(this).css({'background':'url('+ gif.response[id].images.fixed_height.url +') no-repeat center center', 'background-size': 'cover'});
				} else if ($(this).hasClass('playing') === true && $(this).hasClass('.gif-view') === false) {
					$(this).removeClass('playing');
					$(this).css({'background':'url('+ gif.response[id].images.fixed_height_still.url +') no-repeat center center', 'background-size': 'cover'});
				}

			},

			handleViewClick () {

				$('.gif').off();

				let id = $(this).siblings('.gif').attr('data-gif');

				if ($(this).siblings('.gif').hasClass('gif-view') === false) {

					$(this).parent('.col-md-4').removeClass('col-md-4');
					$('.col-md-4').fadeOut();
					$('.top').hide();
					setTimeout(() => {

						$(this).siblings('.gif').addClass('gif-view');
						$(this).siblings('.gif').css({'background':'url('+ gif.response[id].images.fixed_height.url +') no-repeat center center', 'background-size': 'cover'});
						$(this).text('Back');

					}, 500);

				} else {
					$(this).siblings('.gif').css({'background':'url('+ gif.response[id].images.fixed_height_still.url +') no-repeat center center', 'background-size': 'cover'});
					$(this).parent().addClass('col-md-4');
					$(this).siblings('.gif').removeClass('gif-view');
					$(this).text('View');
					$('.col-md-4').fadeIn();
					$('.top').show();

				    $('html, body').animate({
				        scrollTop: $(this).parent().offset().top
				    }, 600);

					$('.gif').hover(gif.handleHover);

				}	

			},

			lazyLoad () {

				var hT = $('.gif').last().offset().top;
				var hH = $('.gif').last().outerHeight();
				var wH = $(window).height();
				var wS = $(window).scrollTop();
				var diff = (hT + hH) - wH;

				if (wS > diff) {

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

					
		        $("html, body").animate({
		            scrollTop: 0
		        }, 1000);
				      		

			}

	}	
}

const gif = giphy();

$(document).ready(function () {

	$('#gif-button').click(gif.handleSubmit);

});