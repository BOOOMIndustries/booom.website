// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require dropzone
//= require turbolinks
//= require_tree .

var ready;
ready = function() {


/*******************************************************************
 	Index page - login menu animation 
*******************************************************************/
	$(".draggable").draggable();
	$(".resizable").resizable();

	$("#login").click(function(){
		$("#reg").fadeIn(1000).removeClass("hidden");
		$("#reg-bg").fadeIn(1000).removeClass("hidden");
	});

	$("p.signup").click(function(){
		$(".sign_label").empty();
		$(".sign_label").append("Sign up");
		$(".sign_btn_submit").empty();
		$(".sign_btn_submit").append("Sign up");
		$(".signup_form").removeClass("hidden");
		$("p.signup").addClass("hidden");
		$("p.signin").removeClass("hidden");
	});

	$("p.signin").click(function(){
		$(".sign_label").empty();
		$(".sign_label").append("Sign In");
		$(".sign_btn_submit").empty();
		$(".sign_btn_submit").append("Sign In");
		$(".signup_form").addClass("hidden");
		$("p.signin").addClass("hidden");
		$("p.signup").removeClass("hidden");
	});

	$("p.close_sign,#reg-bg").click(function(){
		$("#reg").fadeOut(1000,function(){
			$("#reg").addClass("hidden");	
			$("#reg-bg").fadeOut(1000,function(){
				$("#reg-bg").addClass("hidden");
			});
		});
	});

/*******************************************************************
 	Index page - Menu bar animation 
*******************************************************************


	$("#menu1").click(function(){
		close_menu();
		$("#menu1_detail").removeClass("hidden");
		$("#menu1_detail").animate({height:'300px'});
		$(this).css("background-color","#FFFFFF").css("border-bottom","2px solid #33FF66").css("color","#000000");
	});
	$("#menu2").click(function(){
		close_menu();
		$("#menu2_detail").removeClass("hidden");
		$("#menu2_detail").animate({height:'300px'});
		$(this).css("background-color","#FFFFFF").css("border-bottom","2px solid #33FF66").css("color","#000000");
	});
	$("#menu3").click(function(){
		close_menu();
		$("#menu3_detail").removeClass("hidden");
		$("#menu3_detail").animate({height:'300px'});
		$(this).css("background-color","#FFFFFF").css("border-bottom","2px solid #33FF66").css("color","#000000");
	});
	$("#menu4").click(function(){
		close_menu();
		$("#menu4_detail").removeClass("hidden");
		$("#menu4_detail").animate({height:'300px'});
		$(this).css("background-color","#FFFFFF").css("border-bottom","2px solid #33FF66").css("color","#000000");
	});
	$("#menu5").click(function(){
		close_menu();
		$("#menu5_detail").removeClass("hidden");
		$("#menu5_detail").animate({height:'300px'});
		$(this).css("background-color","#FFFFFF").css("border-bottom","2px solid #33FF66").css("color","#000000");
	});
/*******************************************************************
 	Editor link 
*******************************************************************/
$(".snowboard").click(function(){
	window.location.href = "/editors";
});
/*******************************************************************
 	Social Media icon  
*******************************************************************/
$('.fa-facebook').mouseover(function(){
	$(this).css('background','#3b5998');
}).mouseleave(function(){
	$(this).css('background','#909AA0');
});
$('.fa-google-plus').mouseover(function(){
	$(this).css('background','#dd4b39');
}).mouseleave(function(){
	$(this).css('background','#909AA0');
});
$('.fa-instagram').mouseover(function(){
	$(this).css('background','#517fa4');
}).mouseleave(function(){
	$(this).css('background','#909AA0');
});
$('.fa-youtube-play').mouseover(function(){
	$(this).css('background','#bb0000');
}).mouseleave(function(){
	$(this).css('background','#909AA0');
});
$('.fa-envelope-o').mouseover(function(){
	$(this).css('background','#FFFFFF').css('color','#000000');
}).mouseleave(function(){
	$(this).css('background','#909AA0').css('color','#ffffff');
});
/*******************************************************************
 	Index page - Menu Bar animation 
*******************************************************************/
	$('.menu').click(function(){
		var id = $(this).attr('id');
		var target = "." + id; 
		$('html,body').animate({ 
			scrollTop: $(target).offset().top }, 1500);
	});
/*******************************************************************
 	Index page - Designer options animation 
*******************************************************************/
	// $("#wakeboard").mouseover(function(){
	// 	$("#wakeboarding_bk").fadeIn(1000);
	// 	$("#wakeboarding_bk").removeClass("hidden");

	// }).mouseleave(function(){
	// 	$("#wakeboarding_bk").fadeOut(1000);
	// 	$("#wakeboarding_bk").addClass("hidden");
	// });

	// $("#snowboard").mouseover(function(){
	// 	$("#snowboarding_bk").fadeIn(1000);
	// 	$("#snowboarding_bk").removeClass("hidden");

	// }).mouseleave(function(){
	// 	$("#snowboarding_bk").fadeOut(1000);
	// 	$("#snowboarding_bk").addClass("hidden");
	// });

 $("#wakeboard").mouseover(function(){
 		$(".wakeboard").removeClass('hidden');
 }).mouseleave(function(){
 		$(".wakeboard").addClass('hidden');
 });

 $("#snowboard").mouseover(function(){
 		$(".snowboard").removeClass('hidden');
 }).mouseleave(function(){
 		$(".snowboard").addClass('hidden');
 });

/*******************************************************************
 	Index page - menu bar close action 
*******************************************************************

	function close_menu(){
		if(!$("#menu1_detail").hasClass("hidden")){
			$("#menu1_detail").animate({height:'0px'});
			$("#menu1_detail").addClass("hidden");
			$("#menu1").css("background-color","").css("border-bottom","").css("color","#FFFFFF");
		}
		if(!$("#menu2_detail").hasClass("hidden")){
			$("#menu2_detail").animate({height:'0px'});
			$("#menu2_detail").addClass("hidden");
			$("#menu2").css("background-color","").css("border-bottom","").css("color","#FFFFFF");
		}
		if(!$("#menu3_detail").hasClass("hidden")){
			$("#menu3_detail").animate({height:'0px'});
			$("#menu3_detail").addClass("hidden");
			$("#menu3").css("background-color","").css("border-bottom","").css("color","#FFFFFF");
		}  
		if(!$("#menu4_detail").hasClass("hidden")){
			$("#menu4_detail").animate({height:'0px'});
			$("#menu4_detail").addClass("hidden");
			$("#menu4").css("background-color","").css("border-bottom","").css("color","#FFFFFF");
		}
		if(!$("#menu5_detail").hasClass("hidden")){
			$("#menu5_detail").animate({height:'0px'});
			$("#menu5_detail").addClass("hidden");
			$("#menu5").css("background-color","").css("border-bottom","").css("color","#FFFFFF");
		}
	}
	*/

};// end of JQuery 
$(document).ready(ready);
$(document).on('page:load', ready);
