$(function() {

	//SVG Fallback
	if(!Modernizr.svg) {
		$("img[src*='svg']").attr("src", function() {
			return $(this).attr("src").replace(".svg", ".png");
		});
	};

	//Chrome Smooth Scroll
	try {
		$.browserSelector();
		if($("html").hasClass("chrome")) {
			$.smoothScroll();
		}
	} catch(err) {};
	$("img, a").on("dragstart", function(event) { event.preventDefault(); });

	//Вертикальное выравнивание элемента в родителе
	$(function () {
		$(".center_align_box").each(function() {
			var boxHeight = $(this).height();
			$(this).css("margin-top", - boxHeight/2);
		});
	});

	//Адаптивное меню
	$('.toggle_nav').click(function() {
		$('.primary_nav').toggleClass('open');
	});
	$('.primary_nav li a').click(function() {
		$('.primary_nav').removeClass('open');
	});


	//Окраска футера при скроле
	$(document).ready(function(){
		var HeaderTop = $('#header').offset().top;
		$(window).scroll(function(){
			if( $(window).scrollTop() > HeaderTop ) {
				$('header').addClass('dye_header');
				$('.header_container').addClass('reduce_header');
			} 
			else {
				$('header').removeClass('dye_header');
				$('.header_container').removeClass('reduce_header');
			}
		});
	});

	//Выделение якоря при скроле
	// Cache selectors
	var lastId,
	topMenu = $("nav"),
	topMenuHeight = topMenu.outerHeight()+15,
	// All list items
	menuItems = topMenu.find("a"),
	// Anchors corresponding to menu items
	scrollItems = menuItems.map(function(){
		var item = $($(this).attr("href"));
		if (item.length) { return item; }
	});

	//Плавная скрол к якорю
	$(document).ready(function() {
		$('a[href^="#"]').click(function(){
			var el = $(this).attr('href');
			if (el === "#subscribe_popup") return;
			$('body').animate({
				scrollTop: $(el).offset().top}, 700);
			return false; 

		});
	});

	// Bind to scroll
	$(window).scroll(function(){
		// Get container scroll position
		var fromTop = $(this).scrollTop()+topMenuHeight;

		// Get id of current scroll item
		var cur = scrollItems.map(function(){
			if ($(this).offset().top < fromTop) return this;
		});
		// Get the id of the current element
		cur = cur[cur.length-1];
		var id = cur && cur.length ? cur[0].id : "";

		if (lastId !== id) {
			lastId = id;
			// Set/remove active class
			menuItems
			.parent().removeClass("primary_nav_active")
			.end().filter("[href='#"+id+"']").parent().addClass("primary_nav_active");
		}
	});

	//О Нас читать дальше
	$(".about_read_more").click(function () {
		$(this).hide();
		$(".about_more").fadeIn();
  		//Переустановка точек waypoint 
  		setTimeout(function() {
  			Waypoint.refreshAll();
  		}, 800);			
  	})


	//Слайдеры
	$(".sld_switcher").click(function() {

		var sl = $(this).closest(".slider"); 
		var obj = $(this).attr("data-slide-number");
		var bl = $(sl).find("div.slide_"+obj);

		$(sl).find('.sld_switcher').each(function() {
			$(this).removeClass('icons_btn_active');
		}); 
		$(this).addClass("icons_btn_active");
		$(sl).find('[class *= "slide_"]').each(function() {
			$(this).fadeOut(200);
		}); 
		$(bl).delay(200).fadeIn(200);
	});

	//Значимые проекты
	$('.about_project').click(function() {
		$('.about_project_1, .about_project_2, .about_project_3').removeClass('open_aboutslide');
		$(this).addClass('open_aboutslide');
	});

	//Сортировка проектов портфолио
	$(".switcher_portpholio li").click(function() {
		var obj = $(this).attr("id");
		var bl = $(".portpholio").find("." + obj);

		$(".portpholio").find('li').each(function() {
			$(this).removeClass('switcher_portpholio_active');
		}); 

		$(this).addClass("switcher_portpholio_active");
		$(".port_proj").fadeOut();
		$(bl).fadeIn();

		if (obj == "all"){
			$(".port_proj").fadeIn();
		}

  		//Переустановка точек waypoint 
  		setTimeout(function() {
  			Waypoint.refreshAll();
  		}, 800);		
  	});

	//Активный проект портфолио
	$('.project-container').mouseenter(function() {
		$('.portpholio_hover', this).addClass('portpholio_hover_active');
	})
	$('.project-container').mouseleave(function() {
		$('.portpholio_hover', this).removeClass('portpholio_hover_active');
	})

	//Открыть окно подписки
	$(function () {
		$(".subscribe_btn").magnificPopup({
			//removalDelay: 300,
			//mainClass: 'mfp-fade',
			//overflowY: "scroll"
		});

		/*$(window).load(function () {
			$(".pop_up_container").hide();
		});

		$(".subscribe_btn").click(function () {
			$(".pop_up_container").fadeIn();
		})
		$(".pop_up_close").click(function () {
			$(".pop_up_container").fadeOut();
		});*/
	});

	//Диаграммы
	$("#circul-1-1").circliful({percent: 80});
	$("#circul-1-2").circliful({percent: 75});
	$("#circul-1-3").circliful({percent: 60});

	$("#circul-2-1").circliful({percent: 90});
	$("#circul-2-2").circliful({percent: 65});
	$("#circul-2-3").circliful({percent: 80});

	$("#circul-3-1").circliful({percent: 99});
	$("#circul-3-2").circliful({percent: 67});
	$("#circul-3-3").circliful({percent: 82});

	$("#circul-4-1").circliful({percent: 75});
	$("#circul-4-2").circliful({percent: 69});
	$("#circul-4-3").circliful({percent: 59});


	//Текст карты
	$('.map_wallpaper').mouseenter(function() {
		$('.map_wallpaper_text').addClass('map_wallpaper_text_active');
	})
	$('.map_wallpaper').mouseleave(function() {
		$('.map_wallpaper_text').removeClass('map_wallpaper_text_active');
	})

	//Закрытие обложки карты
	$('.map_wallpaper').click(function() {
		$(this).fadeOut();
	})


	//OWL
	$(document).ready(function() {

		$("#owl").owlCarousel({
			slideSpeed : 300,
			paginationSpeed : 700,
			singleItem:true 
		});

	});

	//Анимация
	$(window).ready(function() {
		$(".animation_fadeIn").animated("fadeIn");
	});

	
});