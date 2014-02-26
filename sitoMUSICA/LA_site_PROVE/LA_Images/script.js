$(document).ready(function() {
	var items = $('.item'),
		dist = $(window).get(0).innerHeight,
		container = $('#main'),
		locked = false,
		diapos = $('.diapos'),
		nb_diapos = diapos.size(),
		bioTxt = $('#bioTxt, #bg_bio2'),
		domNav = $('#nav');	
	
	domNav.css('top', '-102px');	
	bioTxt.css({opacity : 0});	
			
	items.each(function(i) {
		var me = $(this),
			posLeft = (parseInt(me.css('marginLeft'), 10) + me.width() / 2) / container.width(),
			posTop = (parseInt(me.css('marginTop'), 10) + me.height() / 2) / container.height();
		$(this).data('coords', {
			top: dist * posTop,
			left: dist * (posLeft - 0.5) * 4,
			origLeft: posLeft,
			origTop: posTop,
			threshold: -(150) + parseInt(me.css('marginTop'), 10)
		}).css({
			top: dist * posTop + 'px',
			left: dist * (posLeft - 0.5) * 4 + 'px'
		});
	}); 
	
	$window = $(window); 
	
	$('[data-type]').each(function() {
		$(this).data('offsetY', parseInt($(this).attr('data-offsetY'), 10));
		$(this).data('Xposition', $(this).attr('data-Xposition'));
		$(this).data('speed', $(this).attr('data-speed'));
	}); 
	
	$('.story').each(function() {
		var $self = $(this),
			offsetCoords = $self.offset(),
			topOffset = offsetCoords.top;
		$(window).scroll(function(e) {
			var viewScroll = $window.scrollTop(); 
			if ((viewScroll + $window.height()) > (topOffset) && ((topOffset + $self.height()) > viewScroll)) { // Scroll the background at var speed
				// the yPos is a negative value because we're scrolling it UP!								
				var yPos = -($window.scrollTop() / $self.data('speed'));
				if ($self.data('offsetY')) {
					yPos += $self.data('offsetY');
				} // Put together our final background position
				var coords = '50% ' + Math.round(yPos) + 'px'; // Move the background
				
				$self.css({
					backgroundPosition: coords
				}); // Check for other sprites in this section	
				$self.find('[data-type="sprite"]').each(function() { // Cache the sprite
					var $sprite = $(this),
						yPos = -($window.scrollTop() / $sprite.data('speed')),
						coords = $sprite.data('Xposition') + ' ' + (Math.round(yPos) + $sprite.data('offsetY')) + 'px';

				$sprite.css({
						backgroundPosition: coords
					});
				}); // sprites
				
				if(viewScroll > 10)
				{
					$('#help').fadeOut();
				}
				
				if (viewScroll < 700) {
					view = 0;
				}
				if (viewScroll >= 700) {
					view = 1;
				}
				if (viewScroll >= 1400) {
					view = 2;
				}
				if (viewScroll >= 2100) {
					view = 3;
				}
				if (viewScroll >= 2800) {
					view = 4;
				}
				if (viewScroll >= 3500) {
					view = 5;
				}
			} // in view
			display_diapos(viewScroll); 
			display_bio(viewScroll);
			hide_packshot(viewScroll);
			//position();
		}); // window scroll
	}); // each data-type
	
	$window.trigger('scroll');
	
	function hide_packshot(v) {
	
		var step = Math.round((700 / 10) * 0.2);
		
		if(v <= 0)
		 {
		 	$('#packshot').css('opacity', 1);
		 }

		if(v > step)
		 {
		 	$('#packshot').css('opacity', 0.9);
		 }

		if(v > step * 2)
		 {
		 	$('#packshot').css('opacity', 0.8);
		 }

		if(v > step * 3)
		 {
		 	$('#packshot').css('opacity', 0.7);
		 }

		if(v > step * 4)
		 {
		 	$('#packshot').css('opacity', 0.6);
		 }

		if(v > step * 5)
		 {
		 	$('#packshot').css('opacity', 0.5);
		 }

		if(v > step * 6)
		 {
		 	$('#packshot').css('opacity', 0.4);
		 }

		if(v > step * 7)
		 {
		 	$('#packshot').css('opacity', 0.3);
		 }

		if(v > step * 8)
		 {
		 	$('#packshot').css('opacity', 0.2);
		 }

		if(v > step * 9)
		 {
		 	$('#packshot').css('opacity', 0.1);
		 }

		if(v > step * 10)
		 {
		 	$('#packshot').css('opacity', 0);
		 }
	
	}

	function display_bio(v) {
		var initView = 500;
		var step = parseInt((700 / 10) * 0.1, 10);
		if (v < (initView)) {
			bioTxt.css({
				opacity : 0
			});
		}			
		if (v > (initView + step)) {
			bioTxt.css({
				opacity : 0.1
			});
		}		
		if (v > (initView + step * 2)) {
			bioTxt.css({
				opacity : 0.2
			});
		}				
		if (v > (initView + step * 3)) {
			bioTxt.css({
				opacity : 0.3
			});
		}
		if (v > (initView + step * 4)) {
			bioTxt.css({
				opacity : 0.4
			});
		}
		if (v > (initView + step * 5)) {
			bioTxt.css({
				opacity : 0.5
			});
		}		
		if (v > (initView + step * 6)) {
			bioTxt.css({
				opacity : 0.6
			});
		}								
		if (v > (initView + step * 7)) {
			bioTxt.css({
				opacity : 0.7
		});
		}	
		if (v > (initView + step * 8)) {
			bioTxt.css({
				opacity : 0.8
			});
		}				
		if (v > (initView + step * 9)) {
			bioTxt.css({
				opacity : 0.9
			});
		}
		if (v > (initView + step * 10)) {
			bioTxt.css({
				opacity : 1,
				'font-size' : '20px'
			});
		}
	}

	function display_diapos(v) {
		var initView = 1700;
		var step = Math.round((700 / nb_diapos) * 0.5);
		if (v < (initView + step)) {
			diapos.hide();
		}
		if (v >= (initView + step)) {
			diapos.hide();
			$('#diapo_01').show();
		}
		if (v > (initView + (step * 2))) {
			diapos.hide();
			$('#diapo_02').show();
		}
		if (v > (initView + (step * 3))) {
			diapos.hide();
			$('#diapo_03').show();
		}
		if (v > (initView + (step * 4))) {
			diapos.hide();
			$('#diapo_04').show();
		}
		if (v > (initView + (step * 5))) {
			diapos.hide();
			$('#diapo_05').show();
		}
		if (v > (initView + (step * 6))) {
			diapos.hide();
			$('#diapo_06').show();
		}
		if (v > (initView + (step * 7))) {
			diapos.hide();
			$('#diapo_07').show();
		}
		if (v > (initView + (step * 8))) {
			diapos.hide();
			$('#diapo_08').show();
		}
		if (v > (initView + (step * 9))) {
			diapos.hide();
			$('#diapo_09').show();
		}
		if (v > (initView + (step * 10))) {
			diapos.hide();
			$('#diapo_10').show();
		}
		if (v > (initView + (step * 11))) {
			diapos.hide();
			$('#diapo_11').show();
		}
		if (v > (initView + (step * 12))) {
			diapos.hide();
			$('#diapo_12').show();
		}
		if (v > (initView + (step * 13))) {
			diapos.hide();
			$('#diapo_13').show();
		}
		if (v > (initView + (step * 14))) {
			diapos.hide();
			$('#diapo_14').show();
		}
		if (v > (initView + (step * 15))) {
			diapos.hide();
			$('#diapo_15').show();
		}
		if (v > (initView + (step * 16))) {
			diapos.hide();
			$('#diapo_16').show();
		}
	}
	
	function position() {
		var scrollTop = $(window).scrollTop();
		items.each(function(i) {
			var coords = $(this).data('coords'),
				factor = Math.max(0, coords.threshold - scrollTop) / coords.threshold,
				easedFactor = ease(factor, 1);
			$(this).stop().css({
				top: coords.top * easedFactor + 'px',
				left: coords.left * easedFactor + 'px'
			});
		});
	}
	
	function ease(value, max) {
		return Math.sin((value / max - 1) * Math.PI / 2) * max + max;
	} 
	
	/* SCROLL */
	var view = 0,
		timeScroll = 700,
		easeScroll = "easeInOutQuart",
		menuItems = $('#mainNav').find('a');
		
	
	$('#savoirplus').live('click', function(e){
		
			e.preventDefault();
			view = 2;
			goTo(view);
	
	});
		
	menuItems.live('click', function(e) {
		
		if(this.target != "")
		{
			return true;
		} else
		{
			e.preventDefault();
			view = parseInt($(this).attr('data-slide'), 10);
			goTo(view);
		}

	}).live('mouseenter', function(e){
		$(this).stop().animate({
			'margin-top' : '-8px'
		}, 300, 'easeOutCirc');
	
	}).live('mouseleave', function(){
		$(this).stop().animate({
			'margin-top' : '0px'
		}, 300, 'easeOutElastic');
	});
	
	domNav.live('mouseenter', function(){
		$(this).stop(false, true).animate({
			'top' : 0	
		},300, 'easeOutExpo');
		$('#bt_menu').hide();
	}).live('mouseleave', function(){
		$(this).stop(false, true).animate({
			'top' : '-102px'	
		},300, 'easeOutExpo');
		$('#bt_menu').delay(250).show();
	});
	
	//Key Events
	$(document).keyup(function(e) {
		var keyCode = (window.event) ? e.which : e.keyCode;
		if (keyCode === 40) {
			view = view + 1;
			if (view >= 5) {
				view = 5;
			}
			goTo(view);
		}
		if (keyCode === 38) {
			view = view - 0;
			if (view <= 0) {
				view = 0;
			}
			goTo(view);
		}
	});

	function goTo(view) {
		if (view === 0) {
			$(window).stop().scrollTo("#first", timeScroll, easeScroll);
		}
		if (view === 1) {
			$(window).stop().scrollTo("#second", timeScroll, easeScroll);
		}
		if (view === 2) {
			$(window).stop().scrollTo("#third", timeScroll, easeScroll);
		}
		if (view === 3) {
			$(window).stop().scrollTo("#fourth", timeScroll, easeScroll);
		}
		if (view === 4) {
			$(window).stop().scrollTo("#fifth", timeScroll, easeScroll);
		}
		if (view === 5) {
			$(window).stop().scrollTo("#sixth", timeScroll, easeScroll);
		}
		menuItems.removeClass('current');
		var href = $('#mainNav').find('a[data-slide="' + view + '"]');
		href.addClass('current');
	} 
	
	/** Playclip **/
	$('#playClip a').live('click', function(e) {
		e.preventDefault();
		$('#clip_yt').fadeIn('fast');
		$('#video').delay(500).animate({
			'margin-top': '150px'
		}, 500, 'easeOutBack');
		$("#jquery_jplayer_1").jPlayer("stop");
		return false;
	});
	
	$('#clip_yt .close').live('click', function(e) {
		e.preventDefault();
		$('#clip_yt').delay(500).fadeOut('fast');
		$('#video').animate({
			'margin-top': '-450px'
		}, 500, 'easeInBack');
		$("#jquery_jplayer_1").jPlayer("play");
		return false;
	}); 
	
	/** Slideshow **/
	var initPosition = 205,
		step = 665,
		slider = $('#photo_slider'),
		photos = slider.find('.photo'),
		photosCount = photos.size(),
		count = 0,
		goto;
	$('#photosNavGauche').live('click', function(e) {
		e.preventDefault();
		count--;
		if (count < 0) {
			count = photosCount - 1;
		}
		move_photos(count);
	});
	$('#photosNavDroite').live('click', function(e) {
		e.preventDefault();
		count++;
		if (count >= photosCount) {
			count = 0;
		}
		move_photos(count);
	}).trigger('click');

	function move_photos(c) {
		goto = Math.round(((step * c) - initPosition));
		slider.stop().animate({
			'left': -(goto) + "px"
		}, 500, 'easeInOutCirc');
	}
	
	var tracks = {
		'0': '01.mp3',
		'1': '02.mp3',
		'2': '03.mp3',
		'3': '04.mp3',
		'4': '05.mp3',
		'5': '06.mp3',
		'6': '07.mp3',
		'7': '08.mp3',
		'8': '09.mp3',
		'9': '10.mp3',
		'10': '11.mp3',
		'11': '12.mp3',
		'12': '13.mp3',
		'13': '14.mp3',
		'14': '15.mp3',
		'15': '16.mp3',
		'16': '17.mp3'
	},
	indice = 0,
	domtracks = $('.playlist').find('a');
	
	$("#jquery_jplayer_1").jPlayer({
		ready: function(event) {
			playsong(indice);
		},
		ended: function(event) {
			indice++;
			playsong(indice);
		},
		swfPath: "js/libs",
		supplied: "mp3",
		wmode: "transparent"
	});

	function playsong(i) {
		$("#jquery_jplayer_1").jPlayer("setMedia", {
			mp3: "songs/" + tracks[i]
		}).jPlayer("play");
		var track_ecoute = $('.playlist a[data-track="'+i+'"]').attr("data-title");
		$('#topTrack').html(track_ecoute);
		domtracks.removeClass('active');
		$('.playlist').find('a[data-track="' + i + '"]').addClass('active');
	}
	
	domtracks.live('click', function(e) {
		e.preventDefault();
		indice = $(this).attr('data-track');
		playsong(indice);
	});
	
	$('.playlist:first').find('a:first').trigger('click');

});