$(function() {
	/*
	=====================
	ГЛОБАЛЬНЫЕ СКРИПТЫ
	=====================
	*/
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
	} catch(err) {

	};



	/* ====== Запретить перетаскивать картинки и ссылки ======*/
	$("img, a").on("dragstart", function(event) { event.preventDefault(); });



	/*========= Вертикальное выравнивание элемента в родителе =========*/
	$(window).load(function () {
		$(".middleAlignBox").each(function() {
			var boxHeight = $(this).height();
			$(this).css("margin-top", - boxHeight/2);
		});
	});





	/*
	===============
	ШАПКА И ОБЛОЖКА
	===============
	*/

	/* =========== Открыть адаптивное меню ==========*/
	$('.toggleNav').click(function() {
		$('nav').toggleClass('openNav');
	});



	/* ======    Плавный скрол к якорю ========*/
	$(document).ready(function() {
		$('a[href^="#"]').click(function(){

			//Закрыть меню на мобильных устройствах
			$("nav").removeClass("openNav")

			var el = $(this).attr('href');
			$('body').animate({
				scrollTop: $(el).offset().top - 59} , 700);
			return false; 
		});
	});



	/*========  Выделить активный пункт меню ========*/
	$('.sectionContent').waypoint(function(direction) {

		var objectId = "#" + this.element.id;
		var activeLink = $('nav a[href='+ objectId +']');

		if(direction == "down") {
			$(activeLink).addClass('linkActive');
			$(activeLink).prev().removeClass('linkActive')
		} else if(direction == "up") {
			$(activeLink).removeClass('linkActive');
			$(activeLink).prev().addClass('linkActive')
		}
	},  {
		offset: '20%'
	});



	/*
	=================
	БОКОВЫЕ ПАНЕЛИ
	================
	*/	

	/*======= Закрепить первую первую боковую панель =========*/
	$('.services').waypoint(function(direction) {
		if(direction == "down") {
			$('.servicesAside').removeClass('firstAside');
		} else if(direction == "up") {
			$('.servicesAside').addClass('firstAside');
		}
	},  {
		offset: '60px'
	});



	/*======= Показать последующие боковые панели ============*/
	$('.sectionContent').waypoint(function(direction) {
		var obj = "#" + this.element.id;
		if(obj == "#services") return;
		if(direction == "down") {
			$(obj).find('aside').addClass('asideActive')
		} else if(direction == "up") {
			$(obj).find('aside').removeClass('asideActive');
		}
	},  {
		offset: '20%'
	});



	/*
	=======
	УСЛУГИ
	=======
	*/
	$(document).ready(function() {

		/*======== Имитация height:"auto"  для работы transition ==============*/

		//Получаем значения высоты блоков servicesContent и записываем их в массив
		var heightElement = new Array();
		var arrayLength = $(".services .contentService").length; 

		var h = $('#portpholio').height();

		//Задержка для полной подгрузки шрифтов и пр.
		setTimeout(function() {
			for(i = 1; i  <= arrayLength; i++) {
				heightElement[i] = $("#servicesBlock_" + i).height();
			}
			$(".contentService").height("0");
		}, 10);




		/*============   Открыть услугу =================*/

		$(".toggleService").click(function () {
			var el = $(this).closest("article");
			var elementContent = $(this).siblings(".contentService");
			var contentId = $(elementContent).attr("rel");

			$(".services article").removeClass("servicesActive");
			$(".contentService").height("0");

			$(el).addClass("servicesActive");
			$(elementContent).height(heightElement[contentId]);


			//Скролим к открытой услуге
			setTimeout(function() {
				var elPosition = $(el).offset().top;
				$('body').animate({			
					scrollTop: elPosition  - 59
				} , 300);;
			}, 800); 
	 		//Переустановка точек waypoint 
	 		setTimeout(function() {
	 			Waypoint.refreshAll();
	 		}, 800);
		 });



		/*===========   Закрыть услугу =============*/
		$(".contentClose").click(function () {
			var el = $(this).closest("article");

			$(".services article").removeClass("servicesActive");
			$(".contentService").height("0");

			//Скролим к закрытой услуге
			setTimeout(function() {
				var elPosition = $(el).offset().top;
				$('body').animate({			
					scrollTop: elPosition  - 59
				} , 300);;
			}, 800); 
	 		//Переустановка точек waypoint 
	 		setTimeout(function() {
	 			Waypoint.refreshAll();
	 		}, 800);
	 	})

	})	



	/*
	=======
	КОНТАКТЫ
	=======
	*/

	/* ======= Показать всплывающие окно обратной связи и звонка ====== */
	$(".btnContainer").click(function() {

		var obj = $(this).attr("id");
		var bl = $(".contacts").find("."+obj);
		$(bl).fadeIn();

 		//Центрирование окна
 		var box = bl.find(".middleAlignBox");
 		var boxheight = box.height();
 		$(box).css("margin-top", - boxheight/2);
 	});

	/* ======= Скрыть всплывающие окно обратной связи и звонка ====== */
	$(".popUpClose ").click( function () {
		$(".popUpContainer").fadeOut();
	})


	/* ======= Показать и скрыть текст карты =====*/
	$('.mapWallpaper').mouseenter(function() {
		$('.mapText').addClass('mapTextActive');
	})
	$('.mapWallpaper').mouseleave(function() {
		$('.mapText').removeClass('mapTextActive');
	})

	//Закрытие обложки карты
	$('.mapWallpaper').click(function() {
		$(this).css("width", "0");
	})
	
	/*
	=======
	ФУТЕР
	=======
	*/

	/*======= Показать футер ==========*/
	$('.contacts').waypoint(function(direction) {
		if(direction == "down") {
			$('footer').addClass('footerActive');
		} else if(direction == "up") {
			$('footer').removeClass('footerActive');
		}
	},  {
		offset: '20%'
	});



	/*=============
	**********************

	СТРАНИЦА ПОРТФОЛИО

	**********************
	=============
	*/


	/*
	===============
	ШАПКА
	===============
	*/

	/*==== Показать адаптивное меню =====*/
	$(".togglePortpholioNav").click(function () {
		$(this).toggleClass("openPortpholioNav");
		$(".portpholioSidePanel").toggleClass("openSidePanel ");
	})


	/*
	=================
	БОКОВАЯ ПАНЕЛЬ
	================
	*/	

	/*=======Переключатель работ======*/
	$(".portpholioSwitcher li").click(function ()  {

		$(".portpholioSidePanel").removeClass("openSidePanel");
		$(".portpholioSwitcher li").removeClass("activeSwitcher");
		$(".togglePortpholioNav").removeClass("openPortpholioNav");


		var switcherId = $(this).attr("id");
		var worksType = $(".worksContainer").find("." + switcherId);

		$(this).addClass("activeSwitcher");

		if (switcherId == "allWorks") {
			$(".work").removeClass("hideWork");
			return;
		}

		$('.work').addClass("hideWork");
		$(worksType).removeClass("hideWork");
	})


	/*
	=================
	СТРАНИЦА РАБОТЫ
	================
	*/	

	/* ===== Скрыть после получения значения высоты для вертикального выравнивания =====*/
	$(window).load(function () {
		$(".projectContainer").hide();
	});

	/* ====== Открыть и  работу ===== */
	$(".work").click(function(){
		$(".projectContainer").fadeIn();
	})
	$(".projectClose").click(function(){
		$(".projectContainer").fadeOut();
	})	

	/* ===== Карусель портфолио ====== */
	$("#portpholioCarousel").owlCarousel({
	      navigation : true, 
	      slideSpeed : 300,
	      paginationSpeed : 400,
	      singleItem:true
  	});

	/* ======= Установить отрицательный маргин для плавающего элемента ====*/
	$(function () {
		var carouselHeight = $(".carouselBox").height();
		console.log(carouselHeight)
	})
	$(function () {
		var artImgHeight = $(".artImg").height();
		console.log(artImgHeight);
		$(".floater").css("margin-top", - artImgHeight/2 + "px")
	})

});

$(window).load(function() {
	setTimeout(function () {
		$(".loader_inner").fadeOut();
		$(".loader").delay(400).fadeOut("slow");
	}, 200);
});
