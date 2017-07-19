// api key dc6zaTOxFJmzC
// host api.giphy.com
// search cat https://api.giphy.com/v1/stickers/search?q=cat&api_key=dc6zaTOxFJmzC
// style="background:url(${res.data[i].images.fixed_height.url}) no-repeat center center; background-size:cover;"

var res = [];
var resIndex;
var page = 0;
function api (searchTerm , page) {

	let query =  `https://api.giphy.com/v1/stickers/search?q=${searchTerm}&api_key=dc6zaTOxFJmzC&offset=${page}`;
	$.ajax({
		url: query,
		method: 'GET'

	}).done(function(result){

		console.log(query);

		for (let i = 0; i < result.data.length; i++) { 
			res.push(result.data[i]);
			var indexOF = res.indexOf(result.data[i]);
			$('.gifs-returned-row').append(
				'<div class="col-md-4 text-center">' +
					`<div class="gif" data-gif="${indexOF}" style="background:url(${res[indexOF].images.fixed_height_still.url}) no-repeat center center; background-size:cover;"></div>` +
					`<a href="#" class="gif-link-view btn btn-primary">View</a>` +
					`<a href="${res[indexOF].images.fixed_height.url}" class="gif-link btn btn-primary" download>Download</a>` +
				'</div>'
			);

		}

		$('.load').removeClass('hide');


		$('.gif').hover(handleHover);

		$('.gif-link-view').click(handleViewClick);


	});

}

function handleHover() {

	let id = $(this).attr('data-gif');

	if ($(this).hasClass('playing') === false && $(this).hasClass('.gif-view') === false) {
		$(this).addClass('playing');
		$(this).css({'background':'url('+ res[id].images.fixed_height.url +') no-repeat center center', 'background-size': 'cover'});
	} else if ($(this).hasClass('playing') === true && $(this).hasClass('.gif-view') === false) {
		$(this).removeClass('playing');
		$(this).css({'background':'url('+ res[id].images.fixed_height_still.url +') no-repeat center center', 'background-size': 'cover'});
	}

}

function handleViewClick() {

		$('.gif').off();

		let id = $(this).siblings('.gif').attr('data-gif');

		if ($(this).siblings('.gif').hasClass('gif-view') === false) {

			$(this).parent('.col-md-4').removeClass('col-md-4');
			$('.col-md-4').fadeOut();
			$('.load').hide();
			$('.top').hide();
			setTimeout(() => {

				$(this).siblings('.gif').addClass('gif-view');
				$(this).siblings('.gif').css({'background':'url('+ res[id].images.fixed_height.url +') no-repeat center center', 'background-size': 'cover'});
				$(this).text('Back');

			}, 500);

		} else {

			$(this).parent().addClass('col-md-4');
			$(this).siblings('.gif').removeClass('gif-view');
			$(this).text('View');
			$('.col-md-4').fadeIn();
			$('.load').show();
			$('.top').show();

		    $('html, body').animate({
		        scrollTop: $(this).parent().offset().top
		    }, 600);

			$('.gif').hover(handleHover);

		}	

}

$(document).ready(function () {

	$('#gif-button').click( function (e) {
		e.preventDefault();
		$('.gifs-returned-row').empty();
		let searchTerm = $('#gif-search').val().replace(/ /g, '+');
		api(searchTerm, page);
		console.log(searchTerm);

		

		$('.load').click( function (e) {

			e.preventDefault();
			page += 25;
			api(searchTerm, page)

		});
		
	});

    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.top').fadeIn();
        } else {
            $('.top').fadeOut();
        }
    });

	$('.top').click(function(){
        $("html, body").animate({
            scrollTop: 0
        }, 1000);
    });   


});
