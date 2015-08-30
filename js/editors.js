var ready; 
ready = function() {

 // controller button action 
  $(".paletIcons").click(function(){
  	var id = $(this).attr('id');
  		closeAllExcept(id);

	  	if( id != 'changeSide' || id != 'zoomIn'
	  		|| id != 'zoomOut' || id != 'zoomOrigin'
	  		|| id != 'save' || id != 'startover'){
	  	var target = "#" + id + "-ctl";
	  	if( !$(target).hasClass('active') ){
	  	  $(target).show().removeClass('hide').addClass('active');
	  	//  if(id == "images"){
	  	 // 	$("#image-editor-ctl").show().removeClass('hide').addClass('active');
	  	 // }
	    }
	    else if ( $(target).hasClass('active') ){
	    	$(target).show().addClass('hide').removeClass('active');	
	    	if(id == "images"){
	  	  	$("#image-editor-ctl").show().addClass('hide').removeClass('active');	
	  	  }
	    }
    }
  });
  // this close all the window except currently selected 
	function closeAllExcept(id){
		var windows = ['#images-ctl','#style-ctl','#size-ctl','#font-ctl','#colorBlash-ctl', '#zoom-ctl'];
		var ids = ['#images','#style','#size','#font','#colorBlash','#zoom'];
		var i = 0;
		for(i; i < 6; i++ ){
			if(ids[i] != '#'+id){
				$(windows[i]).hide().addClass('hide').removeClass('active');
				if(i == 0){
					$("#image-editor-ctl").hide().addClass('hide').removeClass('active');
				}
			}
		}
	}
	// following are default 
	// return window width  
	function getWindowWidth(){
		return $(window).width();
	}

	function setScale(){
		var windowSize = $(window).width();
		scale = windowSize/10203;
	}// return window height
	function getScale(){
		return scale;
	}
	function getWindowHeight(){
		return $(window).height();
	}
	// return original width 
	function getWidth(){
		return 10203;
	}

	// return original height 
	function getHeight(){
		return 1950;
	}

	function getDefaultWidth(){
		return 10203*scale;
	}

	function getDefaultHeight(){	
		return 1950*scale;
	}

	function getPercentageOfWidth(){
		return ($(window).width()/10444)*100;
	}

	function getPercentageOfHeight(){
		return ($(window).height()/2340)*100;
	}
	// side of the editor 
	function getSide(){	
		if($("#style").hasClass("front")){
			return "front";
		}
		else{
			return "back";
		}
	}

	// get center of window x 
	function getCenterOfWindowX(){
		return getWindowWidth() / 2;
	}
	//get center of window y
	function getCenterOfWindowY(){
		return getWindowHeight() / 2; 
	}

	// get center of x with offset 
	function getCenterOfX_offset(offset){
		return getWindowWidth() - offset;
	}
	// get center of y with offset 
	function getCenterOfY_offset(offset){
		return getWindowHeight() - offset; 
	}

	// get div width 
	function getDivWidth(target){
		return $(target).width();
	}

	// get div height
	function getDivHeight(target){
		return $(target).height();
	}
	
/**************************************************************
	Color Selector 
**************************************************************/
// color selector function
// color picker 
  $('.picker').colpick({
	  flat:true,
	  layout:'hex',
	  submit:true,
	  onSubmit: function(hsb,hex,rgb,el){
	  	colorPicked(hex);
	  }
  });
  
  function colorPicked(hex){
  	var color ="#" + hex;
  	if($("#changeSide").hasClass('back')){
  		$('#snowboarding_editor').css("background",color); 
  	}
  	else{
  		$('#snowboarding_editor').css("background",color); 	
  	}
  	return;
  } 
  
/**************************************************************
	Img dialog  
**************************************************************/  
	var images = ['#imgLoader','#imgLoader2','#imgLoader3','#imgLoader4','#imgLoader5'];
	var delIcons = ['#del1','#del2','#del3','#del4','#del5'];
	var rotationIcons = ['#rot1','#rot2','#rot3','#rot4','#rot5'];
	var resizeIcons = ['#res1','#res2','#res3','#res4','#res5'];
	var dragIcons = ['#dor1','#dor2','#dor3','#dor4','#dor5'];
	var selectedElementNo = 0;
	var s = 0;
	$("#add_image").click(function(){		
	
		while(!$(images[s]).hasClass('hide') && s < 5){
			s++;
		}
		if(s <5){
			$(images[s]).removeClass('hide');
			$(delIcons[s]).removeClass('hide');		
			$(rotationIcons[s]).removeClass('hide');		
			$(resizeIcons[s]).removeClass('hide');		
			$(dragIcons[s]).removeClass('hide');				
		}
	});
	
	$(".rrd").click(function(){
		var id_str = $(this).attr('id');
		var id = id_str.substring(3,id_str.length);
		selectedElementNo = id;
		$("#image-editor-ctl").show().addClass('active').removeClass('hide');	
		// rotation 
		if($(this).hasClass('rot')){		
			$("#rotationSlider").removeClass('hide');
			
		}
		// resize
		else if($(this).hasClass('res')){
			$("#ctr-content").empty();
		}
		// dragg
		else if($(this).hasClass('dor')){

		}
	});
	// change the side 
	$("#changeSide").click(function(){
		// front side action
		var sides = ["front","back"]; 
		if(getSide() == sides[0]){
			setFrontData();
			setSide(sides[1]);
		}
		else{
			setBackData();
			setSide(sides[0]);
		}
		return;
	});

	// save button 
	$("#save").click(function(){
		saveData();
		return;
	});
	// delete button 
	$(".del").click(function(){
		var types = ["del","fdel"];
		var id_str = $(this).attr("id");
		var sub = id_str.substring(0,3);
		// images 
		if(sub == types[0]){
			var id = id_str.substring(3,id_str.length);
			id = parseInt(id - 1);
			deleteImage(id);
		}
		// fonts 
		else{
			var id = id_str.substring(4,id_str.length);
			var target = "#font-"+id;
			id = parseInt(id - 1);
			deleteFont(id);
			$(target).val("");

		}
		return;
	});
/**************************************************************
	Canvas Events 
**************************************************************/
	
	var scale = 1;
	var canvOffset = $("#snowboarding_editor").offset();
	var offsetX = canvOffset.left;
	var offsetY = canvOffset.top; 
	var side = "front";
	var boardSize = 163;
	var boardStyle = 0;
	var fBoardColor = "#FFFFFF";
	var bBoardColor = "#FFFFFF";

	var startX;
	var startY;
	var isDown = false; 
	
	var resizeRad = 30;
	var resizerRadius = 4;
	var rSq = resizerRadius * resizerRadius;
	var draggingResizer = { 
		x: 0,
		y: 0
	}
	var img;
	var imgX = 50;
	var imgY = 50;
	var imgWidth, imgHeight, imgRight, imgBottom;
	var rotatable = false;
	var draggable = false; 
	var resizeable = false; 
	var fontSelected = false; 
	var imageCount = 0;
	// html 5 canvas 
	// setting canvas and set the background image 
	var canvas =document.getElementById("snowboarding_editor"); 
	var ctx = canvas.getContext("2d");
	var snowboard = new Image();
	setScale();
	snowboard.src = "../images/163_template_hollow.png"; 
	canvas.width = getWindowWidth();
	canvas.height = getWindowHeight();
	// canvas.width = getDefaultWidth();
	// canvas.height = getDefaultHeight();
	console.log(snowboard.src);
	snowboard.onload = function(){
		ctx.drawImage(snowboard, 0,parseInt(getWindowHeight() * 0.1),getDefaultWidth(),getDefaultHeight());
	}
	
	
	// close all the windows 
	$(".close-window").click(function(){
		closeAllExcept(7);
	});

	// slider action 
	$("#zoomSlider").slider({
		min:0,
		max:360,
		value:0,	
		focus:true,
		change: function(event, ui) {		
			rescale(ui.value);
		}
	});

	 $("#rotationSlider").slider({
		min:0,
		max:360,
		value:0,
		formatt: function(value){			
			return value;
		}
	 });
	
	$("#rotationSlider").slider().on('slide',function(event,ui){
		console.log( "angle : " + $(this).data('slider').getValue() + " num " + selectedElementNo);		
		setAngle(parseInt($(this).data('slider').getValue()), parseInt(selectedElementNo - 1) );
		draw(false,false);
	});
	
	
	// add font 
	$(".add-font").click(function(){
		for(ind = 0; ind < 5; ind++ ){
			var id; 
			if($(this).hasClass(ind)){
				id = ind; 
				break;
			}
		}
		
		var selector = "#font-style_"+ id;
		var fontFam = $(selector).val();
		selector = "#font-"+id;
		var str = $(selector).val();
		addFontToCanvas(parseInt(id-1),str,fontFam);
	});

	// + sign on font controller 
	$("#add_text_field").click(function(){
		var ids = ["#f1","#f2","#f3","#f4","#f5"];
		for(c=0; c < ids.length; c++ ){
			if($(ids[c]).hasClass("hide")){
				$(ids[c]).removeClass("hide").addClass("active");
				break;
			}
		}
	});

	// object action : mouse Down
	$("#snowboarding_editor").mousedown(function(e){
		mouseDown(e);
	});
	
	// object action : mouse Move 
	$("#snowboarding_editor").mousemove(function(e){
		mouseMove(e);
	});
	
	// object action : mouse Up
	$("#snowboarding_editor").mouseup(function(e){
		mouseUp(e);
	});
	
	// object action : mouse out 
	$("#snowboarding_editor").mouseout(function(e){
		mouseOut(e);
	});

	$("#rotation").click(function(){
		rotatable = true;
		resizeable = false;
		draggable = false; 
	});
	$("#resize").click(function(){		
		rotatable = false;
		resizeable = true;
		draggable = false; 
	});
	$("#drag").click(function(){		
		rotatable = false;
		resizeable = false;
		draggable = true; 
	});
	// images 
	var imgLoader = [];	
	imgLoader[0] = document.getElementById('imgLoader');
	imgLoader[1] = document.getElementById('imgLoader2');
	imgLoader[2] = document.getElementById('imgLoader3');
	imgLoader[3] = document.getElementById('imgLoader4');
	imgLoader[4] = document.getElementById('imgLoader5');

	for(x = 0; x< 5; x++){
		console.log(x+" "+ imgLoader[x]);
			imgLoader[x].addEventListener('change',addImageToCanvas,true);
	}
	var strs = [];
	strs[0] = document.getElementById('')
	/**
	* following section should combine together once get done 
	*
	*/
	var fontCounts =0; 
	var imgs = [];
	var fonts = [];
	var fontFamilies = [];
	var fontSizes = [];
	
	var curPosX = 0;
	var curPosY = 0;
	var imgPosX = [];
	var imgPosY = [];
	var imgStartX = [];
	var imgStartY = [];
	var fontStartX = [];
	var fontStartY = [];	
	
	var rotation = [];
	var fontRotation = []; 
	var curpos = 0;
	var index = 0;
	var num = -1;
	var imgRads = [];
	
	// json obj
	var frontData;
	var backData;

	function deleteImage(id){		
		imgs[id] = null;
		draw();
		imageCount--;
	}

	function deleteFont(id){
		strs[id] = '';
		draw();
		fontCounts--;

	}

	function addImageToCanvas(e){
		var reader = new FileReader();		
		reader.onload = function (event){
			img = new Image();			
			imgStartX[index] = 100;
			imgStartY[index] = 100; 			
			
			img.onload = function(){	
				img.width = getScaledImgWidth(img);
				img.height = getScaledImgHeight(img);					
				//ctx.drawImage(img,imgStartX[index],imgStartY[index],img.width,img.height);
				draw(false,false);
			}
			img.src = event.target.result;
			imgs[index] = img;	
			rotation[index] = 0;
			imageCount++;
			index++;
		}	
		reader.readAsDataURL(e.target.files[0]);
	}
	
	function getScaledImgWidth(img){
		return img.width * getScale();
	}
	function getScaledImgHeight(img){
		return img.height * getScale();
	}
	function addFontToCanvas(id,str, fontFamily){
		
		//var ctx = canvas.getContext("2d");
		// ctx.font = "'400pt "+ fontFamily +"'";
		fontStartX[id] = 300;
		fontStartY[id] = 300;
		fontRotation[id] = 0;
		fonts[id] = '300px Arial';	
		fontFamilies[id] = 'Arial';
		fontSizes[id] = 300;
		strs[id] = str;
		
		
		ctx.font = fonts[id];		
		ctx.fillText(str, fontStartX[id],fontStartY[id]);
		setSelected(true); 
		drawDots(id);		
		fontCounts++;		
		return ctx; 
	}
	// var curPosX = 0;
	// var curPosY = 0;
	//	var imgPosX = [];
	//	var imgPosY = [];
	// img tracks current selected image 
	/**
	* coordinate reference 
	*   P1------P2
	*    |           |
	*   p3------P4
	* http://www.html5rocks.com/en/mobile/touch/
	*/
  // following section are test 
  function printStrs(){
  	console.log("****** strings *****");
  	for(m=0;m < strs.length;m++){
  		console.log(m + " "+ strs[m] + " font width " +getFontWidth(m) );
  	}
  } 

	// image points 
	function getXP1(i){	return parseFloat(imgStartX[i]);	}
	function getYP1(i){	return parseFloat(imgStartY[i]);	}
	function getXP2(i){	return parseFloat(imgStartX[i] + imgs[i].width);	}
	function getYP2(i){	return parseFloat(imgStartY[i]);	}
	function getXP3(i){	return parseFloat(imgStartX[i]);	}
	function getYP3(i){	return parseFloat(imgStartY[i] + imgs[i].height); 	}
	function getXP4(i){	return parseFloat(imgStartX[i] + imgs[i].width ); 	}
	function getYP4(i){	return parseFloat(imgStartY[i] + imgs[i].height);	}
	function getImageWidth(i){	return parseFloat(imgs[i].width);	}
	function getImageHeight(i){	return parseFloat(imgs[i].height);	}
	function getImageCenterX(i){	return parseFloat(getXP2(i)/2 ); }
	function getImageCenterY(i){	return parseFloat(getYP3(i)/2); }	
	
	// font points 
	function getFXP1(i){	return parseFloat(fontStartX[i]);	 }
	function getFYP1(i){	return parseFloat(fontStartY[i]); 	 }
	function getFXP2(i){	return parseFloat(fontStartX[i]) + getFontWidth(i);	 }
	function getFYP2(i){	return parseFloat(fontStartY[i]);	 }
	function getFXP3(i){	return parseFloat(fontStartX[i]);	 }
	function getFYP3(i){	return parseFloat(fontStartY[i]) + getFontHeight(i);	 }
	function getFXP4(i){	return parseFloat(fontStartX[i]) + getFontWidth(i);	 }
	function getFYP4(i){	return parseFloat(fontStartY[i]) + getFontHeight(i);	 }
	function getFontWidth(i){		return parseFloat(ctx.measureText(strs[i]).width); }
	function getFontHeight(i){ return fontSizes[i]; }
	function getFontString(i){	return getFontSize(i) + "px " + getFontFamily(i); }
	function getFontFamily(i){	return fontFamilies[i];	}
	function getFontSize(i){	return fontSizes[i]; }
	
	// max and min values 
	function getMinX(i){	return Math.min(getAngledXP1(i), 	getAngledXP2(i),   getAngledXP3(i),  getAngledXP4(i));			}
	function getMaxX(i){	return Math.max(getAngledXP1(i), 	getAngledXP2(i), 	 getAngledXP3(i),  getAngledXP4(i));			}
	function getMinY(i){	return Math.min(getAngledYP1(i), 	getAngledYP2(i), 	 getAngledYP3(i),  getAngledYP4(i));			}
	function getMaxY(i){	return Math.max(getAngledYP1(i), 	getAngledYP2(i), 	 getAngledYP3(i),  getAngledYP4(i));			}
	function getFMinX(i){	return Math.min(getAngledFXP1(i), getAngledFXP2(i), getAngledFXP3(i), getAngledFXP4(i));			}
	function getFMaxX(i){	return Math.max(getAngledFXP1(i),getAngledFXP2(i), getAngledFXP3(i), getAngledFXP4(i));			}
	function getFMinY(i){	return Math.min(getAngledFYP1(i), getAngledFYP2(i), getAngledFYP3(i), getAngledFYP4(i));			}
	function getFMaxY(i){	return Math.max(getAngledFYP1(i),getAngledFYP2(i), getAngledFYP3(i), getAngledFYP4(i));			}
	function getSelected(){	return fontSelected; }
	function getSide(){	return side;	}
	function getBoardSize(){	return boardSize;	}
	function getBoardStyle(){	return boardStyle;	}
	function getFBoardColor(){	return fBoardColor;	}
	function getBBoardColor(){	return bBoardColor;	}
	function getFrontData(){	return frontData;	}
	function getBackData(){	return backData;	}
	/*************************************************************
	*	Angle need to be positive 
	*  Q1 (+x, +y)
	*	Q2 (-x, +y)
	*	Q3 (-x, -y)
	*	Q4 (+x, -y)
	* Q2 Q3 Q4 need to return positive number 
	* Issue Fixed 
	* 
	*************************************************************/
	
	function getAngledXP1(i){	return getXP1(i);		}	
	function getAngledYP1(i){	return getYP1(i);		}

	function getAngledXP2(i){
		var xp2 = getXP2(i) - getXP1(i);
		var yp2 = getYP2(i) - getYP1(i);		
		xp2 = parseFloat( Math.cos((360 - rotation[i])*Math.PI/180) * xp2 + Math.sin((360 - rotation[i])*Math.PI/180) * yp2 );		
		return xp2 + getXP1(i);
	}
	
	function getAngledYP2(i){	
		var xp2 = getXP2(i) - getXP1(i);
		var yp2 = getYP2(i) - getYP1(i);
		yp2 = parseFloat( - Math.sin((360 - rotation[i])*Math.PI/180) * xp2 + Math.cos((360 - rotation[i])*Math.PI/180) * yp2 );			
		return yp2 + getYP1(i);
	}
	// following coordinate need to be adjust 
	function getAngledXP3(i){	
		var xp3 = getXP3(i) - getXP1(i);
		var yp3 = getYP3(i) - getYP1(i);		
		xp3 = parseFloat( Math.cos((360 - rotation[i])*Math.PI/180) * xp3 + Math.sin((360 - rotation[i])*Math.PI/180) * yp3 );		
		return xp3 + getXP1(i);
	}
	function getAngledYP3(i){	
		var xp3 = getXP3(i) - getXP1(i);
		var yp3 = getYP3(i) - getYP1(i);
		yp3 = parseFloat( - Math.sin((360 - rotation[i])*Math.PI/180) * xp3 + Math.cos((360 - rotation[i])*Math.PI/180) * yp3 );		
		return yp3 + getYP1(i);
	}
	
	function getAngledXP4(i){
		var xp4 = getXP4(i) - getXP1(i);
		var yp4 = getYP4(i) - getYP1(i);		
		xp4 = parseFloat( Math.cos((360 - rotation[i])*Math.PI/180) * xp4 + Math.sin((360 - rotation[i])*Math.PI/180) * yp4 );
		return xp4 + getXP1(i);
	}
	function getAngledYP4(i){	
		var xp4 = getXP4(i) - getXP1(i);
		var yp4 = getYP4(i) - getYP1(i);
		yp4 = parseFloat( - Math.sin((360 - rotation[i])*Math.PI/180) * xp4 + Math.cos((360 - rotation[i])*Math.PI/180) * yp4 );	
		return yp4 + getYP1(i);
	}
	
	function getAngledFXP1(i){	return getFXP1(i);	}
	function getAngledFYP1(i){	return getFYP1(i);	}	
	function getAngledFXP2(i){
		var xp2 = getFXP2(i) - getFXP1(i);
		var yp2 = getFYP2(i) - getFYP1(i);		
		xp2 = parseFloat( Math.cos((360 - fontRotation[i])*Math.PI/180) * xp2 + Math.sin((360 - fontRotation[i])*Math.PI/180) * yp2 );		
		return xp2 + getFXP1(i);
	}
	function getAngledFYP2(i){
		var xp2 = getFXP2(i) - getFXP1(i);
		var yp2 = getFYP2(i) - getFYP1(i);
		yp2 = parseFloat( - Math.sin((360 -fontRotation[i])*Math.PI/180) * xp2 + Math.cos((360 - fontRotation[i])*Math.PI/180) * yp2 );			
		return yp2 + getFYP1(i);
	}	
	function getAngledFXP3(i){
		var xp3 = getFXP3(i) - getFXP1(i);
		var yp3 = getFYP3(i) - getFYP1(i);		
		xp3 = parseFloat( Math.cos((360 - fontRotation[i])*Math.PI/180) * xp3 + Math.sin((360 - fontRotation[i])*Math.PI/180) * yp3 );		
		return xp3 + getFXP1(i);
	}
	function getAngledFYP3(i){
		var xp3 = getFXP3(i) - getFXP1(i);
		var yp3 = getFYP3(i) - getFYP1(i);
		yp3 = parseFloat( - Math.sin((360 - fontRotation[i])*Math.PI/180) * xp3 + Math.cos((360 - fontRotation[i])*Math.PI/180) * yp3 );		
		return yp3 + getFYP1(i);
	}
	function getAngledFXP4(i){
		var xp4 = getFXP4(i) - getFXP1(i);
		var yp4 = getFYP4(i) - getFYP1(i);		
		xp4 = parseFloat( Math.cos((360 - fontRotation[i])*Math.PI/180) * xp4 + Math.sin((360 - fontRotation[i])*Math.PI/180) * yp4 );
		return xp4 + getFXP1(i);
	}
	function getAngledFYP4(i){
		var xp4 = getFXP4(i) - getFXP1(i);
		var yp4 = getFYP4(i) - getFYP1(i);
		yp4 = parseFloat( - Math.sin((360 - fontRotation[i])*Math.PI/180) * xp4 + Math.cos((360 - fontRotation[i])*Math.PI/180) * yp4 );	
		return yp4 + getFYP1(i);
	}
	
	function getImageRadious(i){	return parseInt(imgRads[i]);	}

	function setImageWidth(i,w){	imgs[i].width = w;	}
	function setImageHeight(i,h){	imgs[i].height = h;	}
	function setStartingPointX(i,pos){	imgStartX[i] = pos;	}
	function setStartingPointY(i,pos){	imgStartY[i] = pos;	}
	function setImageRadious(i){ 
		var px = parseInt(imgs[i].width + getXP1(i));
		var py = parseInt(imgs[i].height + getYP1(i));
		imgRads[i] = parseInt(Math.sqrt(px * px + py * py));	
	} 

	
	function setFontWidth(i,w){	fonts[i].width = w;	}	
	function setFontStartingPointX(i,pos){fontStartX[i] = pos;	}
	function setFontStartingPointY(i,pos){fontStartY[i] = pos;	}
	function setSelected(b){	fontSelected = b	}
	function setFontSize(i,size){	fontSizes[i] = size; }
	function setResizedFontSize(i,size,scale){	fontSizes[i] = size * scale;	}
	function setSide(s){	side = s; }
	function setBoardSize(bs){	boardSize = bs;	}
	function setBoardStyle(bs){	boardStyle = bs;	}
	function setFBoardColor(fc){	fBoardColor = fc;	}
	function setBBoardColor(bc){	bBoardColor = bc;	}

	function drawDots(i){
		/*
		console.log("XP1 "+ getXP1(i) + " YP1 " + getYP1(i) + " XP2 " + getXP2(i) + " YP2 " + getYP2(i)
							+	"\nXP3 "+ getXP3(i) + " YP3 " + getYP3(i) + " XP4 " + getXP4(i) + " YP4 " + getYP4(i) 
							+ "\nAXP2 " + getAngledXP2(i) + " AYP2 " + getAngledYP2(i) + " AXP3 " + getAngledXP3(i) + " AYP3 " + getAngledYP3(i)
							+ "\nAXP4 " + getAngledXP4(i) + " AYP4 " + getAngledYP4(i) + " AXP1 " + getAngledXP1(i) + " AYP1 " + getAngledYP1(i) 
							+ "\nCurX " +getCurrentPointerPositionX() + " CurY " + getCurrentPointerPositionY()
							+ "\nWidth " + imgs[i].width + " height " + imgs[i].height + " angle " + rotation[i]
							);
		*/
		var rotated = false; 
		console.log("fontSelected " + getSelected() );
		if(getSelected()){
			xp1 = getFXP1(i);	yp1 = getFYP1(i) - getFontHeight(i);
			xp2 = getFXP2(i);	yp2 = getFYP2(i) - getFontHeight(i);
			xp3 = getFXP3(i);	yp3 = getFYP3(i) - getFontHeight(i);
			xp4 = getFXP4(i);	yp4 = getFYP4(i) - getFontHeight(i);		

			console.log(	"xp1 " + xp1 + " yp1 " + yp1 + " xp2 " + xp2 + " yp2 " + yp2 + " xp3 " + xp3 + " yp3 " + yp3 + " xp4 " + xp4 + " yp4 " + yp4	);
			console.log(	"cur X " + getCurrentPointerPositionX() + " cur Y " +getCurrentPointerPositionY() );
			if(fontRotation[i] != 0){
				ctx.translate(-xp1,-yp1);
				rotated = true; 
			}
		}else{
			xp1 = getXP1(i);	yp1 = getYP1(i);
			xp2 = getXP2(i);	yp2 = getYP2(i);
			xp3 = getXP3(i);	yp3 = getYP3(i);
			xp4 = getXP4(i);	yp4 = getYP4(i);
			if(rotation[i] != 0){
				ctx.translate(-xp1,-yp1);			
				rotated = true; 
			}
			ctx.beginPath()
			ctx.arc(xp2,yp2,resizeRad,0,pi2,false);		
			ctx.stroke();	
			ctx.beginPath();			
			ctx.arc(xp3,yp3,resizeRad,0,pi2,false);
			ctx.stroke();	
		}					
		ctx.beginPath();		
		ctx.arc(xp1,yp1,resizeRad,0,pi2,false);
		ctx.stroke();
		ctx.beginPath();	
		ctx.arc(xp4,yp4,resizeRad,0,pi2,false);
		ctx.stroke();					
						
		if(rotated){
			ctx.translate(getDefaultWidth(),getDefaultHeight());
		}
		
	}
	
	
	function getElemNumber(e){
		console.log(imageCount + "Element Number x" + parseInt(e.clientX - offsetX) + " y: " + parseInt(e.clientY - offsetY));
		setCurrentPointerPosition(e);
		// element is not selected 
		if(fontCounts > 0){
			for(x=0; x < fonts.length; x++){
				console.log("FXP1 "+ getFXP1(x) + " FYP1 " + getFYP1(x) + " FXP2 " + getFXP2(x) + " FYP2 " + getFYP2(x)
							+	"\nFXP3 "+ getFXP3(x) + " FYP3 " + getFYP3(x) + " FXP4 " + getFXP4(x) + " FYP4 " + getFYP4(x) 
							+ "\nAFXP2 " + getAngledFXP2(x) + " AFYP2 " + getAngledFYP2(x) + " AFXP3 " + getAngledFXP3(x) + " AFYP3 " + getAngledFYP3(x)
							+ "\nAFXP4 " + getAngledFXP4(x) + " AFYP4 " + getAngledFYP4(x) + "AFXP1 " + getAngledFXP1(x) + " AFYP1 " + getAngledFYP1(x) 
							+ "\nCurX " + getCurrentPointerPositionX() + " CurY " + getCurrentPointerPositionY()
							
							);
				if(strs[x] != ''){
					if((getCurrentPointerPositionX() >= getFXP1(x) - resizeRad && getCurrentPointerPositionX() <= getFXP2(x) + resizeRad 
						&& getCurrentPointerPositionY() >= getFYP1(x) - resizeRad - getFontHeight(x)  && getCurrentPointerPositionY() <= getFYP3(x) + resizeRad - getFontHeight(x) )
						|| (getCurrentPointerPositionX() >= getFMinX(x) - resizeRad && getCurrentPointerPositionX() <= getFMaxX(x) + resizeRad
						&& getCurrentPointerPositionY() >= getFMinY(x) - getFontHeight(x) - resizeRad && getCurrentPointerPositionY() <= getFMaxY(x) + resizeRad - getFontHeight(x))  
					){					
						console.log("font Contents no. " + x);
						return x; 
					}
				}
			}
		}
		if(imageCount > 0){
			for(w=0;w< imgs.length; w++){			
					console.log("XP1 "+ getXP1(w) + " YP1 " + getYP1(w) + " XP2 " + getXP2(w) + " YP2 " + getYP2(w)
							+	"\nXP3 "+ getXP3(w) + " YP3 " + getYP3(w) + " XP4 " + getXP4(w) + " YP4 " + getYP4(w) 
							+ "\nAXP2 " + getAngledXP2(w) + " AYP2 " + getAngledYP2(w) + " AXP3 " + getAngledXP3(w) + " AYP3 " + getAngledYP3(w)
							+ "\nAXP4 " + getAngledXP4(w) + " AYP4 " + getAngledYP4(w) + "AXP1 " + getAngledXP1(w) + " AYP1 " + getAngledYP1(w) 
							+ "\nCurX " +getCurrentPointerPositionX() + " CurY " + getCurrentPointerPositionY()
							+ "\nWidth " + imgs[w].width + " height " + imgs[w].height + " angle " + rotation[w]
							);
				if(imgs[w] != null){	
					if((getCurrentPointerPositionX() >= getXP1(w) - resizeRad && getCurrentPointerPositionX() <= getXP2(w) + resizeRad 
						&& getCurrentPointerPositionY() >= getYP1(w) - resizeRad  && getCurrentPointerPositionY() <= getYP3(w) + resizeRad )
						|| (getCurrentPointerPositionX() >= getMinX(w) - resizeRad && getCurrentPointerPositionX() <= getMaxX(w) + resizeRad
						&& getCurrentPointerPositionY() >= getMinY(w) - resizeRad && getCurrentPointerPositionY() <= getMaxY(w) + resizeRad)  
					){					
						return w; 
					}
				}
			}
		}
		return -1;
	}
	
	function getSelectedPoint(e){
		setCurrentPointerPosition(e);
		num = getElemNumber(e);
		if(num != -1){
			// selected P1
			if(isFontElem(e)){
				if(( getCurrentPointerPositionX() <= getFXP3(num) + resizeRad && getCurrentPointerPositionX() >= getFXP3(num) - resizeRad 
					&& getCurrentPointerPositionY() <= getFYP3(num) + resizeRad && getCurrentPointerPositionY() >= getFYP3(num) - resizeRad  )
					|| ( getCurrentPointerPositionX() <= getAngledFXP3(num) + resizeRad && getCurrentPointerPositionX() >= getAngledFXP3(num) - resizeRad 
					&& getCurrentPointerPositionY() <= getAngledFYP3(num) + resizeRad  && getCurrentPointerPositionY() >= getAngledFYP3(num)  - resizeRad ) 
					){
					return 1;
				}
				if((getCurrentPointerPositionX() <= getFXP4(num) + resizeRad && getCurrentPointerPositionX() >= getFXP4(num) - resizeRad 
					&& getCurrentPointerPositionY() <= getFYP4(num) + resizeRad && getCurrentPointerPositionY() >= getFYP4(num) - resizeRad )  
					|| ( getCurrentPointerPositionX() <= getAngledFXP4(num) + resizeRad && getCurrentPointerPositionX() >= getAngledFXP4(num) - resizeRad 
					&& getCurrentPointerPositionY() <= getAngledFYP4(num) + resizeRad  && getCurrentPointerPositionY() >= getAngledFYP4(num)  - resizeRad ) 
					){
					return 2;
				}
				if((getCurrentPointerPositionX() <= getFXP1(num) + resizeRad && getCurrentPointerPositionX() >= getFXP1(num) - resizeRad 
					&& getCurrentPointerPositionY() <= getFYP1(num) + resizeRad && getCurrentPointerPositionY() >= getFYP1(num) - resizeRad )
					|| ( getCurrentPointerPositionX() <= getAngledFXP1(num)  + resizeRad && getCurrentPointerPositionX() >= getAngledFXP1(num) - resizeRad 
					&& getCurrentPointerPositionY() <= getAngledFYP1(num)  + resizeRad && getCurrentPointerPositionY() >= getAngledFYP1(num) - resizeRad  ) 
					){
					return 3;
				}
				if(( getCurrentPointerPositionX() <= getFXP2(num) + resizeRad && getCurrentPointerPositionX() >= getFXP2(num) - resizeRad
					&& getCurrentPointerPositionY() <= getFYP2(num) + resizeRad && getCurrentPointerPositionY() >= getFYP2(num) - resizeRad )
					|| ( getCurrentPointerPositionX() <= getAngledFXP2(num)  + resizeRad && getCurrentPointerPositionX() >= getAngledFXP2(num) - resizeRad 
					&& getCurrentPointerPositionY() <= getAngledFYP2(num)  + resizeRad && getCurrentPointerPositionY() >= getAngledFYP2(num) - resizeRad  )
				){
					return 4;
				}
			}
			else{
				if((getCurrentPointerPositionX() <= getXP1(num) + resizeRad && getCurrentPointerPositionX() >= getXP1(num) - resizeRad 
				 && getCurrentPointerPositionY() <= getYP1(num) + resizeRad && getCurrentPointerPositionY() >= getYP1(num) - resizeRad  )
				){
					return 1;
				}
				if((getCurrentPointerPositionX() <= getXP2(num) + resizeRad && getCurrentPointerPositionX() >= getXP2(num) - resizeRad 
				 	&& getCurrentPointerPositionY() <= getYP2(num) + resizeRad && getCurrentPointerPositionY() >= getYP2(num) - resizeRad )  
				 	||(getCurrentPointerPositionX() <= getAngledXP2(num) + resizeRad && getCurrentPointerPositionX() >= getAngledXP2(num) - resizeRad 
				 	&& getCurrentPointerPositionY() <= getAngledYP2(num) + resizeRad  && getCurrentPointerPositionY() >= getAngledYP2(num)  - resizeRad ) 
				){
					return 2;
				}
				if((getCurrentPointerPositionX() <= getXP3(num) + resizeRad && getCurrentPointerPositionX() >= getXP3(num) - resizeRad 
					&& getCurrentPointerPositionY() <= getYP3(num) + resizeRad && getCurrentPointerPositionY() >= getYP3(num) - resizeRad )
					|| ( getCurrentPointerPositionX() <= getAngledXP3(num)  + resizeRad && getCurrentPointerPositionX() >= getAngledXP3(num) - resizeRad 
					&& getCurrentPointerPositionY() <= getAngledYP3(num)  + resizeRad && getCurrentPointerPositionY() >= getAngledYP3(num) - resizeRad  )){
					return 3;
				}
				if(( getCurrentPointerPositionX() <= getXP4(num) + resizeRad && getCurrentPointerPositionX() >= getXP4(num) - resizeRad
					&& getCurrentPointerPositionY() <= getYP4(num) + resizeRad && getCurrentPointerPositionY() >= getYP4(num) - resizeRad )
					|| ( getCurrentPointerPositionX() <= getAngledXP4(num)  + resizeRad && getCurrentPointerPositionX() >= getAngledXP4(num) - resizeRad 
					&& getCurrentPointerPositionY() <= getAngledYP4(num)  + resizeRad && getCurrentPointerPositionY() >= getAngledYP4(num) - resizeRad  )
					){
					return 4;
				}
			}			
		}
		return -1;
	}
	function setCurrentPointerPosition(e){
		curPosX = parseInt(e.clientX - offsetX);
		curPosY = parseInt(e.clientY - offsetY); 
	}
	function getCurrentPointerPositionX(){
		return curPosX;
	}
	function getCurrentPointerPositionY(){
		return curPosY;
	}
	function isResizable(e){
		console.log("isResizeable");
		num = getElemNumber(e);
		console.log("num " + num);
		// selected P1
		if(num != -1){
			if(isFontElem(e)){
				if( 
					// (curPosX <= getFXP1(num) + resizeRad && curPosX >= getFXP1(num) - resizeRad && curPosY <= getFYP1(num) + resizeRad && curPosY >= getFYP1(num) - resizeRad  )
				  //|| (curPosX <= getFXP2(num) + resizeRad && curPosX >= getFXP2(num) - resizeRad && curPosY <= getFYP2(num) + resizeRad && curPosY >= getFYP2(num) - resizeRad  )
					// (curPosX <= getFXP3(num) + resizeRad && curPosX >= getFXP3(num) - resizeRad && curPosY <= getFYP3(num) + resizeRad && curPosY >= getFYP3(num) - resizeRad  )
				  (curPosX <= getFXP4(num) + resizeRad && curPosX >= getFXP4(num) - resizeRad && curPosY <= getFYP4(num) - getFontHeight(num) + resizeRad && curPosY >= getFYP4(num) - getFontHeight(num) - resizeRad  )
				 // || (curPosX <= getAngledFXP2(num) + resizeRad  && curPosX >= getAngledFXP2(num) - resizeRad  && curPosY <= getAngledFYP2(num)+ resizeRad  && curPosY >= getAngledFYP2(num) - resizeRad  )
				 // || (curPosX <= getAngledFXP3(num) + resizeRad  && curPosX >= getAngledFXP3(num) - resizeRad  && curPosY <= getAngledFYP3(num)+ resizeRad  && curPosY >= getAngledFYP3(num) - resizeRad  )
				 || (curPosX <= getAngledFXP4(num) + resizeRad && curPosX >= getAngledFXP4(num)  - resizeRad && curPosY <= getAngledFYP4(num) - getFontHeight(num) + resizeRad && curPosY >= getAngledFYP4(num) - getFontHeight(num) - resizeRad )
				){
					return true;
				}
			}
			else{
				if( 
				//	(curPosX <= getXP1(num) + resizeRad && curPosX >= getXP1(num) - resizeRad && curPosY <= getYP1(num) + resizeRad && curPosY >= getYP1(num) - resizeRad  )
				 (curPosX <= getXP2(num) + resizeRad && curPosX >= getXP2(num) - resizeRad && curPosY <= getYP2(num) + resizeRad && curPosY >= getYP2(num) - resizeRad  )
				|| (curPosX <= getXP3(num) + resizeRad && curPosX >= getXP3(num) - resizeRad && curPosY <= getYP3(num) + resizeRad && curPosY >= getYP3(num) - resizeRad  )
				|| (curPosX <= getXP4(num) + resizeRad && curPosX >= getXP4(num) - resizeRad && curPosY <= getYP4(num) + resizeRad && curPosY >= getYP4(num) - resizeRad  )
				|| (curPosX <= getAngledXP2(num) + resizeRad  && curPosX >= getAngledXP2(num) - resizeRad  && curPosY <= getAngledYP2(num)+ resizeRad  && curPosY >= getAngledYP2(num) - resizeRad  )
				|| (curPosX <= getAngledXP3(num) + resizeRad  && curPosX >= getAngledXP3(num) - resizeRad  && curPosY <= getAngledYP3(num)+ resizeRad  && curPosY >= getAngledYP3(num) - resizeRad  )
				|| (curPosX <= getAngledXP4(num) + resizeRad && curPosX >= getAngledXP4(num)  - resizeRad && curPosY <= getAngledYP4(num) + resizeRad && curPosY >= getAngledYP4(num)  - resizeRad )
				){
					return true; 
				}
			}
		}
		return false;
	}

	var selectedPoint = -1;
	
	function mouseDown(e){
		setCurrentPointerPosition(e);
		console.log("mouseDown" + "\nCurX " +getCurrentPointerPositionX() + " CurY " + getCurrentPointerPositionY());
		console.log("Width : " + parseFloat(ctx.measureText(strs[0]).width));
		console.log("FX1 : " + getAngledFXP1(0) + " FY1 " + getAngledFYP1(0));
		// capture all the elements coordinate 
		if(isFontElem(e)){	setSelected(true); }
		else if(imageCount > 0 )
		{			
			num = getElemNumber(e);
			if(num >-1){
				$("#img-ctling").empty().append("Currently Selected Image No. " + num );
				 selectedElementNo = num;
			}
			else{
				$("#img-ctling").empty();
			}
			setSelected(false);
		}
		if(isResizable(e)){
			console.log("resizable");
			resizeable = true; 
			draggable = false; 
			selectedPoint = getSelectedPoint(e);
			console.log("selected Point "+ selectedPoint);
		}
		else{
			console.log("draggable ");
			resizeable = false; 
			draggable = true; 
		}				
	}

	var angle = 0; 
	
	function setAngle(value,k){
		angle = 360 - value;
		if(getSelected()){
			console.log("font rotation ");
			fontRotation[k] = angle;
		}else{
			console.log("image rotation ");
			rotation[k] = angle;	
		}
		console.log(angle);
	}

	
	function getDistanceOf(x1,y1,x2,y2){
		return Math.sqrt( (x2-x1)*(x2-x1) + (y2-y1)*(y2-y1) );
	}
	function isFontElem(e){
		console.log("isFontElem " + fontCounts);
		setCurrentPointerPosition(e);
		
		for(i = 0; i < fontCounts; i++){
			console.log(i+ " FXP1 " + getFXP1(i) + " FYP1 " + getFYP1(i) + " FX2 " + getFXP2(i) + " FYP3 " + getFYP3(i) + " curX "+ getCurrentPointerPositionX() +" cur Y "+ getCurrentPointerPositionY());
			if(strs[i] != ''){
				if( (getCurrentPointerPositionX() >= getFXP1(i) - resizeRad && getCurrentPointerPositionX() <= getFXP2(i) + resizeRad
					&& getCurrentPointerPositionY() >= getFYP1(i) - getFontHeight(i) - resizeRad && getCurrentPointerPositionY() <= getFYP3(i) - getFontHeight(i) + resizeRad )
					|| (getCurrentPointerPositionX() >= getAngledFXP1(i) - resizeRad && getCurrentPointerPositionX() <= getAngledFXP2(i) + resizeRad
					&& getCurrentPointerPositionY() >= getAngledFYP1(i) - getFontHeight(i) - resizeRad && getCurrentPointerPositionY() <= getAngledFYP3(i) - getFontHeight(i) + resizeRad )
					){
					console.log("this is font elem ");
					//setSelected(true);
					return true; 
				}
			}
		}
		
		//setSelected(false);
		console.log("this is not a font: fontCounts "+ fontCounts + " str[0] " + strs[0] );
		return false; 		
	}
	function mouseMove(e){
		console.log("mouseMove");
	//	if(draggingResizer > -1){			
			// drag action here 

			if(draggable){
				ctx.clearRect(0,0,canvas.width,canvas.height);		
				console.log(img+ " " + e + " " +imgLoader[0]);
				// font action 
				if(isFontElem(e)){					
					fontNum = getElemNumber(e);
					console.log("font NUm " + fontNum );
					if(typeof fonts[fontNum] != 'undefined'){
						setCurrentPointerPosition(e);																					
						fontStartX[fontNum] = getCurrentPointerPositionX() - getDistanceOf(getAngledFXP3(fontNum),getAngledFYP3(fontNum),getAngledFXP4(fontNum),getAngledFYP4(fontNum)) /2;
						fontStartY[fontNum] = getCurrentPointerPositionY() - getDistanceOf(getAngledFXP3(fontNum),getAngledFYP3(fontNum),getAngledFXP1(fontNum),getAngledFYP1(fontNum)) /2 + getFontHeight(x);	

						console.log("Font Start x1 : " + fontStartX[fontNum] + " y1: " + fontStartY[fontNum]);
						//setSelected(true);
					}
					// setSelected(false);
				}
				// image action 
				else {
					num = getElemNumber(e);
					if(typeof imgs[num] != 'undefined'){
						setCurrentPointerPosition(e);										
											
						imgStartX[num] = getCurrentPointerPositionX() - getDistanceOf(getAngledXP1(num),getAngledYP1(num),getAngledXP2(num),getAngledYP2(num)) /2;
						imgStartY[num] = getCurrentPointerPositionY() - getDistanceOf(getAngledXP1(num),getAngledYP1(num),getAngledXP3(num),getAngledYP3(num)) /2;				

						console.log(imgs[num]+ " "+ imgStartX[num] +" "+ imgStartY[num]+ " " +imgs[num].width+" "+imgs[num].height);		
									
					}
					//setSelected(false);	
				}
				draw(false,false);				
			}
			// resize action here 
			else if(resizeable){
				if(isFontElem(e)){	
					console.log("resizeable selectedPoint " + selectedPoint);
					switch (selectedPoint){
						case 1:
							// resize P1, P3
							console.log("case 1");
							setCurrentPointerPosition(e);											
							break;
							
						case 2:
							// resize P1,P2
							console.log("case 2");
							setCurrentPointerPosition(e);	
							if(num != -1){							
								if(getCurrentPointerPositionX() != getFXP2(num) && getCurrentPointerPositionX() != getFXP1(num)){
									diff = parseInt(getCurrentPointerPositionX() - getFXP3(num));
									console.log("new width " + diff);

									setFontWidth(num,diff);
													
								}
								draw(false,false);
							} 
							break;
						case 3:
							// resize P3, P1
							console.log("case 3");	
							setCurrentPointerPosition(e);							
							if(num != -1){
								if(getCurrentPointerPositionY() != getFYP3(num) && getCurrentPointerPositionY() != getFYP1(num) ){
									diff = parseInt(getFontWidth(num) + getCurrentPointerPositionY() - getFYP1(num));
									console.log("new height " + diff);								
									setFontSize(num, diff);
								}							
								draw(false,false);
							}
							
							break;
						case 4:
							// resize P3, P4
							setCurrentPointerPosition(e);						
							console.log("case 4 " + (getCurrentPointerPositionX(e) - offsetX) + " " + (getCurrentPointerPositionY(e) - offsetY) + " " + num );
							// shrinking returns number 
							if(num != -1){
								if(getCurrentPointerPositionY() != getFYP3(num) - getFontHeight(num) && getCurrentPointerPositionY() != getFYP4(num) - getFontHeight(num)){
									diff = parseInt(getFontHeight(num) + getCurrentPointerPositionY() - getAngledFYP2(num));
									
									console.log("new height " + diff);
									setFontSize(num, diff);
								}							
								if((getCurrentPointerPositionX() != getFXP3(num) && getCurrentPointerPositionX() != getFXP4(num))							
								){
									diff = parseInt(getCurrentPointerPositionX() - getFXP3(num));
									console.log("new width " + diff);
									setFontWidth(num, diff);						
								}
								draw(false,false);
							} 
							break;
					}
				}
				else{
					console.log("resizeable selectedPoint " + selectedPoint);
					switch (selectedPoint){
						case 1:
							// resize P1, P3
							console.log("case 1");
							setCurrentPointerPosition(e);											
							break;
							
						case 2:
							// resize P1,P2
							console.log("case 2");
							setCurrentPointerPosition(e);	
							if(num != -1){								
								if(getCurrentPointerPositionX() != getXP2(num) && getCurrentPointerPositionX() != getXP1(num)){
									diff = parseInt(getCurrentPointerPositionX() - getXP3(num));
									console.log("new width " + diff);
									setImageWidth(num, diff);						
								}
								draw(false,false);
							} 
							break;
						case 3:
							// resize P3, P1
							console.log("case 3");	
							setCurrentPointerPosition(e);							
							if(num != -1){
								if(getCurrentPointerPositionY() != getYP3(num) && getCurrentPointerPositionY() != getYP1(num) ){
									diff = parseInt(getCurrentPointerPositionY() - getYP1(num));
									console.log("new height " + diff);
									setImageHeight(num, diff);
								}							
								draw(false,false);
							}
							
							break;
						case 4:
							// resize P3, P4
							setCurrentPointerPosition(e);						
							console.log("case 4 " + (getCurrentPointerPositionX(e) - offsetX) + " " + (getCurrentPointerPositionY(e) - offsetY) + " " + num );
							// shrinking returns number 
							if(num != -1){
								if(getCurrentPointerPositionY() != getYP3(num) && getCurrentPointerPositionY() != getYP4(num) ){
									diff = parseInt(getCurrentPointerPositionY() - getAngledYP2(num));
									
									console.log("new height " + diff);
									setImageHeight(num, diff);
								}							
								if((getCurrentPointerPositionX() != getXP3(num) && getCurrentPointerPositionX() != getXP4(num))							
								){
									diff = parseInt(getCurrentPointerPositionX() - getXP3(num));
									console.log("new width " + diff);
									setImageWidth(num, diff);						
								}
								draw(false,false);
							} 
							break;
					}
				} 
			}
	}
	
	function mouseUp(e){
		console.log("mouseUp");
		setCurrentPointerPosition(e);
		draggable = false; 
		resizeable = false;
		num = -1;
		draw(true,false);
		// test 
		printStrs();
	}
	
	function mouseOut(e){
		console.log("mouseOut");
		mouseUp(e);
	}
	
	function rescale(sca){
		console.log("rescale");
		canvas.save();
		canvas.width = getWidth() * sca / 100;
		canvas.height = getHeight() * sca / 100;
	}

	function updateCanvas(){
		console.log("updateCanvas");
		clear();
		
		
		// syntax note 
		// context.drawImage(img ,sx ,sy ,swidth ,sheight ,x ,y ,width ,height );
		
		ctx.drawImage(snowboard,0,parseInt(getWindowHeight()*0.1),getWidth(),getHeight());
		ctx.save();
		
	}
	
	function zoom(){
		console.log("zoom");
		var pt = ctx.transformedPoint(prevX,prevY);
		
	}
	
	function clear(){
		console.log("clear");
		var p1 = ctx.transformedPoint(0,0); // left top 
		var p2 = ctx.transformedPoint(canbas.width, canvas.height);
		ctx.clearRect(p1.x, p1.y, p2.x-p1.x, p2.y-p1.y);
	}
	
	function hitImg(x,y){
		console.log("hitImg");
		return (x > imgX && x < imgX + imgWidth && y > imgY && y < imgY + imgHeight); 
	}

	var pi2 = Math.PI * 2;
	function draw(img,anchor, boarder){
	console.log("draw");
		// clear the canvas 
		ctx.clearRect(0,0,canvas.width,canvas.height);
		ctx.drawImage(snowboard, 0, parseInt(getWindowHeight()*0.1),getDefaultWidth(),getDefaultHeight());	
		// drawing / restoring fonts 
		if(fontCounts > -1){
			for(f = 0; f < fonts.length; f++){
				ctx.save();
				if(strs[f] != ''){				
					if(fontRotation[f] != 0){
						console.log("Font Rotation in Draw");
						ctx.translate(getFXP1(f),getFYP1(f));
						ctx.rotate(fontRotation[f]*Math.PI/180);						
						ctx.fillText(strs[f], 0,0);		
						drawDots(f);
						ctx.translate(getDefaultWidth(),getDefaultHeight());	

					}
					else{				
						console.log("font in draw " + getFontString(f));								
						ctx.font = getFontString(f);
						ctx.fillText(strs[f], getFXP1(f),getFYP1(f));				
						drawDots(f);
					}	
					ctx.restore();
				}			
			}
		}
		// drawing / restoring images 
		if(imageCount >-1){
			for(p = 0; p< imgs.length;p++){						
				ctx.save();
				if(imgs[p] != null){
					setImageRadious(p);
					// rotating 
					if(rotation[p] != 0){
						//ctx.translate(getImageCenterX(p), getImageCenterY(p));
						ctx.translate(getXP1(p) , getYP1(p) );
						console.log("image center X "+ getImageCenterX(p) + " image center Y " +  getImageCenterY(p) + " XP1 " + getXP1(p) + " YP1 " +getYP1(p));				
						ctx.rotate(rotation[p]*Math.PI/180);
						// here need to track all the corners of image 
						ctx.drawImage(imgs[p],0, 0,imgs[p].width,imgs[p].height);						
						drawDots(p);
						ctx.translate(getDefaultWidth(),getDefaultHeight());				
					}
					else{
						ctx.drawImage(imgs[p],imgStartX[p],imgStartY[p],imgs[p].width,imgs[p].height);				
						drawDots(p);
					}									
					ctx.restore();		
				}
			}
		}
	}

	function setFrontData(){
		frontData = {
			"side": "front",
				"images":[
					{	"imgURL":"","xp1":0,	"xp2":0,	"xp3":0,	"xp4":0, "axp1":0,	"axp2":0,	"axp3":0,	"axp4":0,	"angle":0,"width":0,"height":0, "scale":0 	},
					{	"imgURL":"","xp1":0,	"xp2":0,	"xp3":0,	"xp4":0, "axp1":0,	"axp2":0,	"axp3":0,	"axp4":0,	"angle":0,"width":0,"height":0, "scale":0 	},
					{	"imgURL":"","xp1":0,	"xp2":0,	"xp3":0,	"xp4":0, "axp1":0,	"axp2":0,	"axp3":0,	"axp4":0,	"angle":0,"width":0,"height":0, "scale":0 	},
					{	"imgURL":"","xp1":0,	"xp2":0,	"xp3":0,	"xp4":0, "axp1":0,	"axp2":0,	"axp3":0,	"axp4":0,	"angle":0,"width":0,"height":0, "scale":0 	},
					{	"imgURL":"","xp1":0,	"xp2":0,	"xp3":0,	"xp4":0, "axp1":0,	"axp2":0,	"axp3":0,	"axp4":0,	"angle":0,"width":0,"height":0, "scale":0 	}
				],
				"fonts":[
					{	"font":"text",	"fxp1":0,	"fxp2":0,	"fxp3":0,	"fxp4":0,	"afxp1":0,	"afxp2":0,	"afxp3":0,	"afxp4":0,"angle":0,"width":0,"height":0, "scale":0 	},
					{	"font":"text",	"fxp1":0,	"fxp2":0,	"fxp3":0,	"fxp4":0,	"afxp1":0,	"afxp2":0,	"afxp3":0,	"afxp4":0,"angle":0,"width":0,"height":0, "scale":0 	},
					{	"font":"text",	"fxp1":0,	"fxp2":0,	"fxp3":0,	"fxp4":0,	"afxp1":0,	"afxp2":0,	"afxp3":0,	"afxp4":0,"angle":0,"width":0,"height":0, "scale":0 	},
					{	"font":"text",	"fxp1":0,	"fxp2":0,	"fxp3":0,	"fxp4":0,	"afxp1":0,	"afxp2":0,	"afxp3":0,	"afxp4":0,"angle":0,"width":0,"height":0, "scale":0 	},
					{	"font":"text",	"fxp1":0,	"fxp2":0,	"fxp3":0,	"fxp4":0,	"afxp1":0,	"afxp2":0,	"afxp3":0,	"afxp4":0,"angle":0,"width":0,"height":0, "scale":0 	},
				],
				"backgroundColor":"#FFFFFF"
		}
		console.log("frontData" + frontData );
	}
	
	function setBackData(){
		backData = {
			"side": "back",
				"images":[
					{	"imgURL":"","xp1":0,	"xp2":0,	"xp3":0,	"xp4":0, "axp1":0,	"axp2":0,	"axp3":0,	"axp4":0,	"angle":0,"width":0,"height":0, "scale":0 	},
					{	"imgURL":"","xp1":0,	"xp2":0,	"xp3":0,	"xp4":0, "axp1":0,	"axp2":0,	"axp3":0,	"axp4":0,	"angle":0,"width":0,"height":0, "scale":0 	},
					{	"imgURL":"","xp1":0,	"xp2":0,	"xp3":0,	"xp4":0, "axp1":0,	"axp2":0,	"axp3":0,	"axp4":0,	"angle":0,"width":0,"height":0, "scale":0 	},
					{	"imgURL":"","xp1":0,	"xp2":0,	"xp3":0,	"xp4":0, "axp1":0,	"axp2":0,	"axp3":0,	"axp4":0,	"angle":0,"width":0,"height":0, "scale":0 	},
					{	"imgURL":"","xp1":0,	"xp2":0,	"xp3":0,	"xp4":0, "axp1":0,	"axp2":0,	"axp3":0,	"axp4":0,	"angle":0,"width":0,"height":0, "scale":0 	}
				],
				"fonts":[
					{	"font":"text",	"fxp1":0,	"fxp2":0,	"fxp3":0,	"fxp4":0,	"afxp1":0,	"afxp2":0,	"afxp3":0,	"afxp4":0,"angle":0,"width":0,"height":0, "scale":0 	},
					{	"font":"text",	"fxp1":0,	"fxp2":0,	"fxp3":0,	"fxp4":0,	"afxp1":0,	"afxp2":0,	"afxp3":0,	"afxp4":0,"angle":0,"width":0,"height":0, "scale":0 	},
					{	"font":"text",	"fxp1":0,	"fxp2":0,	"fxp3":0,	"fxp4":0,	"afxp1":0,	"afxp2":0,	"afxp3":0,	"afxp4":0,"angle":0,"width":0,"height":0, "scale":0 	},
					{	"font":"text",	"fxp1":0,	"fxp2":0,	"fxp3":0,	"fxp4":0,	"afxp1":0,	"afxp2":0,	"afxp3":0,	"afxp4":0,"angle":0,"width":0,"height":0, "scale":0 	},
					{	"font":"text",	"fxp1":0,	"fxp2":0,	"fxp3":0,	"fxp4":0,	"afxp1":0,	"afxp2":0,	"afxp3":0,	"afxp4":0,"angle":0,"width":0,"height":0, "scale":0 	},
				],
				"backgroundColor":"#FFFFFF"
		}
		console.log("backData" + backData );
	}

	function getImagesDATA(){
		var image = [];
		var d = [];
		var ind = 0;
		for(ind; ind < imageCount; ind++){
			image[ind] = {
				"imgURL":"","xp1":getXP1(ind),	"xp2":getXP2(ind),	"xp3":getXP3(ind),	"xp4":getXP4(ind), 
				"yp1":getYP1(ind), "yp2": getYP2(ind), "yp3": getYP3(ind), "yp4": getYP4(ind), "ayp1": getAngledYP1(ind), "ayp2": getAngledYP2(ind), "ayp3": getAngledYP3(ind), "ayp4": getAngledYP4(ind),
				"axp1":getAngledXP1(ind),	"axp2":getAngledXP2(ind),	"axp3":getAngledXP3(ind),	"axp4":getAngledXP4(ind),	"angle":0,"width":0,"height":0, "scale":0 	
			}
			d[ind] = image[ind]; 
		}
		return d;
	}

	function getFontsDATA(){
		var font = [];
		var d = [];
		var ind = 0;
		for(ind; ind < fontCounts; ind++){
			font[ind] = {
				"font":"text",	"fxp1":getFX1(0),	"fxp2":getFX2(0),	"fxp3":getFX3(0),	"fxp4":getFX4(0),"fyp1":getFY1(0),	"fyp2":getFY2(0),	"fyp3":getFY3(0),	"fyp4":getFY4(0),	
				"afxp1":getAngledFXP1(0),	"afxp2":getAngledFXP1(0),	"afxp3":getAngledFXP1(0),	"afxp4":getAngledFXP1(0),"afyp1":getAngledFYP1(0),	"afyp2":getAngledFYP2(0),	"afyp3":getAngledFYP3(0),	
				"afyp4":getAngledFYP4(0),"angle":0,"width":0,"height":0, "scale":0 	
			}
			d[ind] = font[ind]; 
		}
		return d;	
	}

	// capture the data and send to server 
	// json array 0 is front side 1 is back side 
	function saveData(){
		var data = [
			{
				"userdata":[
						{	
							"username": "user", 
							"userid": "000000"
						}
				],
				"boarddata":[
						{ 
							"side": "front",
							"size":0,
							"style":0,
							"images": getImagesDATA(),
							"fonts": getFontsDATA(),
							"backgroundColor":"#FFFFFF"
						},
						{
							"side": "back",
							"images": getImagesDATA(),
							"fonts": getFontsDATA(),
							"backgroundColor":"#FFFFFF"
						}						
				]
			}
		];// end of data 


		// console.log("json parse " + data[0]["boarddata"][0]["images"][0]["xp1"]);
	}

	// send data that created in saveData 
	function sendData(data){
		$.ajax({
			url: "",
			type: "POST",
			dataType: "json",
			success: function(d){
				// success msg
			}
		});
	}

	// capture the data and expot to img file 
	function exportToImage(){
		var exp = canvas.toDataURL("image/png");

	}

	// get data from server and place everything on it 
	function recover(){

	}



};// end of JQuery 
$(document).ready(ready);
$(document).on('page:load', ready);