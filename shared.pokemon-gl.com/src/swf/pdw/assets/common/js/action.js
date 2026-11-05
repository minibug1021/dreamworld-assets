
$(function() {
	var toggleElm = $('#container h3');
	toggleElm.mouseover(function(){ $(this).addClass("btnOver"); });
	toggleElm.mouseout(function(){ $(this).removeClass("btnOver"); });

	var icons = {
		header: "iconclose",
		headerSelected: "iconopen"
	};
	$("#accordion").accordion({
		icons: icons,
		header:"h3",
		active:false,
		navigation:false,
		alwaysOpen:false,
		autoHeight:false,
		collapsible:true,
		animated:"easeInOutCubic"
	});
	
	var space = 34;
	$("h3#so-net").click(function(){
		$(this).blur();
		var targetOffset = $("h3#so-net").offset().top + (space*0) - space;
		$('html,body').animate({ scrollTop: targetOffset }, {duration: 700, easing: "easeInOutCubic"});
	});
	$("h3#ameba").click(function(){
		$(this).blur();
		var targetOffset = $("h3#so-net").offset().top + (space*1) - space;
		$('html,body').animate({ scrollTop: targetOffset }, {duration: 700, easing: "easeInOutCubic"});
	});
	$("h3#fc2").click(function(){
		$(this).blur();
		var targetOffset = $("h3#so-net").offset().top + (space*2) - space;
		$('html,body').animate({ scrollTop: targetOffset }, {duration: 700, easing: "easeInOutCubic"});
	});
	$("h3#yahoo").click(function(){
		$(this).blur();
		var targetOffset = $("h3#so-net").offset().top + (space*3) - space;
		$('html,body').animate({ scrollTop: targetOffset }, {duration: 700, easing: "easeInOutCubic"});
	});
	$("h3#old-livedoor").click(function(){
		$(this).blur();
		var targetOffset = $("h3#so-net").offset().top + (space*4) - space;
		$('html,body').animate({ scrollTop: targetOffset }, {duration: 700, easing: "easeInOutCubic"});
	});
	$("h3#new-livedoor").click(function(){
		$(this).blur();
		var targetOffset = $("h3#so-net").offset().top + (space*5) - space;
		$('html,body').animate({ scrollTop: targetOffset }, {duration: 700, easing: "easeInOutCubic"});
	});
	$("h3#seesaa").click(function(){
		$(this).blur();
		var targetOffset = $("h3#so-net").offset().top + (space*6) - space;
		$('html,body').animate({ scrollTop: targetOffset }, {duration: 700, easing: "easeInOutCubic"});
	});
	$("h3#yaplog").click(function(){
		$(this).blur();
		var targetOffset = $("h3#so-net").offset().top + (space*7) - space;
		$('html,body').animate({ scrollTop: targetOffset }, {duration: 700, easing: "easeInOutCubic"});
	});
	$("h3#jugem").click(function(){
		$(this).blur();
		var targetOffset = $("h3#so-net").offset().top + (space*8) - space;
		$('html,body').animate({ scrollTop: targetOffset }, {duration: 700, easing: "easeInOutCubic"});
	});
	$("h3#cocolog").click(function(){
		$(this).blur();
		var targetOffset = $("h3#so-net").offset().top + (space*9) - space;
		$('html,body').animate({ scrollTop: targetOffset }, {duration: 700, easing: "easeInOutCubic"});
	});
});
	
$(function () {
        $('.link_to_top').click(function () {
            $(this).blur();

            $('html,body').animate({ scrollTop: 0 }, {duration: 1000, easing: "easeInOutCubic"});

            return false;
        });
});

$(function () {
	$('.link_to_termsofuse').click(function () {
		$(this).blur();
		
		var targetOffset = $('#termsofuse').offset().top - 30;
		$('html,body').animate({ scrollTop: targetOffset }, {duration: 500, easing: "easeInOutCubic"});

		return false;
	});
	
	$('.link_to_howtouse').click(function () {
		$(this).blur();
		
		var targetOffset = $('#howtouse').offset().top - 30;
		$('html,body').animate({ scrollTop: targetOffset }, {duration: 700, easing: "easeInOutCubic"});

		return false;
	});
});