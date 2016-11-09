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

	//Вертикальное выравнивание элемента в родителе
	$(window).load(function () {
		$(".middleAlign").each(function() {
			var boxHeight = $(this).height();
			$(this).css("margin-top", - boxHeight/2);
		});
	});

	//Показать описание работы при наведении курсора
	$('.project').mouseenter(function() {
		$('.projectDescription', this).slideDown(200);
	});
	$('.project').mouseleave(function() {
		$('.projectDescription', this).slideUp(200);
	});


});

$(window).load(function() {
	setTimeout(function () {
		$(".loader_inner").fadeOut();
		$(".loader").delay(400).fadeOut("slow");
	}, 200);
});
