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
		if($("#style").hasClass("back")){
			return "back";
		}
		else{
			return "front";
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
	$(".col").click(function(){
		var id = $(this).attr("id");
		id = id.substring(4,id.length);
		target = "picker-" + id;
		$("#colorBlash-ctl").show().removeClass("hide").addClass("active");
		$(".picker").removeClass("board").attr("id",target);
	});

// color selector function
	var picker_types = 0;
	$(".picker").click(function(){
		if($(this).hasClass("board")){	picker_types = 0; }
		else {	picker_types = 1; 	}
	});

// color picker 
  $('.picker').colpick({
	  flat:true,
	  layout:'hex',
	  submit:true,
	  onSubmit: function(hsb,hex,rgb,el){
	  	if(picker_types == 0)
	  	{	colorPicked(hex);	}
	  	else
	  	{	
	  		var id = $(".picker").attr("id");
				id = id.substring(7,id.length);
	  		setFontColor(parseInt(id-1),hex); 
	  	}
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
	
	$("#add_image").click(function(){
		var ids = ["#i1","#i2","#i3","#i4","#i5"];
		for(c=0; c < ids.length; c++ ){
			if($(ids[c]).hasClass("hide")){
				$(ids[c]).removeClass("hide").addClass("active");
				break;
			}
		}
	});
	
	$(".rrd, .frrd").click(function(){
		var id_str = $(this).attr('id');
		var id;
		if($(this) == '.rrd'){
		 	id = id_str.substring(3,id_str.length);
		 	
		}else{
			id = id_str.substring(4,id_str.length);
		}
		selectedElementNo = id;
		$("#image-editor-ctl").show().addClass('active').removeClass('hide');	
		// rotation 
		if($(this).hasClass('rot')){		
			$("#rotationSlider").removeClass('hide');
			
		}
		// resize
		// else if($(this).hasClass('res')){
		// 	$("#ctr-content").empty();
		// }
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
			id = parseInt(id - 1);
			deleteFont(id);
			
			
		}
		return;
	});

	$("#startover").click(function(){
		clearAll();		
		colorPicked("FFFFFF");	
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
	// console.log(snowboard.src);
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
		// console.log( "angle : " + $(this).data('slider').getValue() + " num " + selectedElementNo + " isFont : "+ getSelected());		
		setAngle(parseInt($(this).data('slider').getValue()), parseInt(selectedElementNo),getSelected() );
		draw(false,false);
	});
	
	
	// add font 
	$(".add-font").click(function(){
		for(ind = 0; ind < 6; ind++ ){
			var id; 
			if($(this).hasClass(ind)){
				id = ind; 
				break;
			}
		}
		
		var selector = "#ffam-"+ id;
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
				$(ids[c]).find("select").attr("id","ffam-"+(c+1));

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

	//for(x = 0; x< 5; x++){
		// console.log(x+" "+ imgLoader[x]);
			imgLoader[0].addEventListener('change',function(e){ addImageToCanvas(e,0); },false);
			imgLoader[1].addEventListener('change',function(e){ addImageToCanvas(e,1); },false);
			imgLoader[2].addEventListener('change',function(e){ addImageToCanvas(e,2); },false);
			imgLoader[3].addEventListener('change',function(e){ addImageToCanvas(e,3); },false);
			imgLoader[4].addEventListener('change',function(e){ addImageToCanvas(e,4); },false);
			
	//}
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
	var fontWidth = [];
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
	var fontColors = [];
	// json obj
	var frontData;
	var backData;

	function deleteImage(id){		
		imgs[id] = null;
		draw();
		if(id >= imageCount)
		{	imageCount--;	}
		if(id != 0 ){
			$("#imgLoader"+parseInt(id+1)).val('');
			$("#i"+parseInt(id+1)).addClass("hide");
		}
		else{
			$("#imgLoader").val('');
		}
	}

	function deleteFont(id){
		strs[id] = '';
		var target = "#font-"+parseInt(id+1);
		draw();	
		if(id >= fontCounts)
		{	fontCounts--;		}
		if(id != 0 ){
			$("#f"+parseInt(id+1)).addClass("hide");
		}
		$(target).val("");
	}

	function clearAll(){
		for(i=0; i < imgs.length ; i++){	
			if(imgs[i] != null){
				deleteImage(i);
			}	
		} 
		for(i=0; i < strs.length ; i++){	
			if(strs[i]!= ''){
				deleteFont(i);	
			}
		}
		imageCount = 0;
		fontCounts = 0;
		draw();
	}

	function addImageToCanvas(e,id){
		var reader = new FileReader();			
		
		reader.onload = function (event){
			img = new Image();			
			imgStartX[id] = getCenterOfWindowX();
			imgStartY[id] = getCenterOfWindowY(); 			
			
			img.onload = function(){	
				img.width = getScaledImgWidth(img);
				img.height = getScaledImgHeight(img);									
				draw(false,false);
			}
			img.src = event.target.result;
			imgs[id] = img;	
			rotation[id] = 0;
			imageCount++;
			 
			setSelected(false);
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
		
		
		fonts[id] = '300px ' + fontFamily;	
		fontFamilies[id] = fontFamily;
		fontSizes[id] = 300;
		strs[id] = str;
		fontStartX[id] = getCenterOfWindowX();// - getFontWidth(id);
		fontStartY[id] = getCenterOfWindowY();// - getFontHeight(id);		
		ctx.font = fonts[id];		
		//ctx.fillText(str, getFXP1(id) ,getFYP1(id));
		setSelected(true); 
		fontRotation[id] = 0;
		draw(false,false);
		printStrs();
		//drawDots(id);	
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
  	// console.log("****** strings *****");
  	for(m=0;m < strs.length;m++){
  		// console.log(m + " "+ strs[m] + " font width " +getFontWidth(m) );
  	}
  } 

	// image points 
	function getXP1(i){	return parseFloat(imgStartX[i] - imgs[i].width/2 );				}
	function getYP1(i){	return parseFloat(imgStartY[i] - imgs[i].height/2);				}
	function getXP2(i){	return parseFloat(imgStartX[i] + imgs[i].width/2 );				}
	function getYP2(i){	return parseFloat(imgStartY[i] - imgs[i].height/2 );			}
	function getXP3(i){	return parseFloat(imgStartX[i] - imgs[i].width/2  );			}
	function getYP3(i){	return parseFloat(imgStartY[i] + imgs[i].height/2 ); 			}
	function getXP4(i){	return parseFloat(imgStartX[i] + imgs[i].width/2  ); 			}
	function getYP4(i){	return parseFloat(imgStartY[i] + imgs[i].height/2 );			}
	function getImageWidth(i){	return parseFloat(imgs[i].width);	}
	function getImageHeight(i){	return parseFloat(imgs[i].height);	}
	function getImageCenterX(i){	return parseFloat((getXP1(i) + getXP2(i))/2 ); 	}
	function getImageCenterY(i){	return parseFloat((getYP1(i) + getYP3(i))/2); 	}	
	function getFontCenterX(i){		return parseFloat((getFXP1(i) + getFXP2(i))/2);	}
	function getFontCenterY(i){		return parseFloat((getFYP3(i) + getFYP1(i))/2);	}
	
	// font points 
	function getFXP1(i){	return parseFloat(fontStartX[i] - getFontWidth(i)/2);	 }
	function getFYP1(i){	return parseFloat(fontStartY[i] - getFontHeight(i)/2);  }
	function getFXP2(i){	return parseFloat(fontStartX[i] + getFontWidth(i)/2);	 }
	function getFYP2(i){	return parseFloat(fontStartY[i] - getFontHeight(i)/2);	 }
	function getFXP3(i){	return parseFloat(fontStartX[i] - getFontWidth(i)/2);	 }
	function getFYP3(i){	return parseFloat(fontStartY[i] + getFontHeight(i)/1.5);	 }
	function getFXP4(i){	return parseFloat(fontStartX[i] + getFontWidth(i)/2);	 }
	function getFYP4(i){	return parseFloat(fontStartY[i] + getFontHeight(i)/1.5);	 }
	function getFontWidth(i){		return fontWidth[i]; }
	function getFontHeight(i){ return fontSizes[i] * 0.8; }
	function getFontString(i){	return getFontSize(i) + "px " + getFontFamily(i); }
	function getFontFamily(i){	return fontFamilies[i];	}
	function getFontSize(i){	return fontSizes[i]; }
	function getFontColor(i){	return fontColors[i];	}
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
	function getAngle(i,isFont){
		if(isFont){
			return fontRotation[i];
		}else{
			return rotation[i];
		}
	}
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
	

	function getAngledXP1(i){
		var xp1 = getXP1(i) - getImageCenterX(i);
		var yp1 = getYP1(i) - getImageCenterY(i);
		var r = parseFloat(rotation[i]);
		xp1 = parseFloat( (Math.cos( r * Math.PI/180) * xp1) + (Math.sin( r * Math.PI/180 ) * yp1) );			
		return xp1 + getImageCenterX(i);
	}
	
	function getAngledYP1(i){	
		var xp1 = getXP1(i) - getImageCenterX(i);
		var yp1 = getYP1(i) - getImageCenterY(i);
		var r = rotation[i];
		yp1 = parseFloat( -(Math.sin( r * Math.PI/180 ) * xp1) + (Math.cos( r * Math.PI/180 ) * yp1 ));			
		return yp1 + getImageCenterY(i);
	}

	function getAngledXP2(i){
		var xp2 = getXP2(i) - getImageCenterX(i);
		var yp2 = getYP2(i) - getImageCenterY(i);
		var r = rotation[i];
		xp2 = parseFloat( Math.cos( r * Math.PI/180 ) * xp2 + Math.sin( r * Math.PI/180 ) * yp2 );			
		return xp2 + getImageCenterX(i);		
	}
	
	function getAngledYP2(i){	
		var xp2 = getXP2(i) - getImageCenterX(i);
		var yp2 = getYP2(i) - getImageCenterY(i);
		var r = rotation[i];
		yp2 = parseFloat( - Math.sin( r * Math.PI/180 ) * xp2 + Math.cos( r * Math.PI/180 ) * yp2 );			
		return yp2 + getImageCenterY(i);
	}
	// following coordinate need to be adjust 
	function getAngledXP3(i){	
		var xp3 = getXP3(i) - getImageCenterX(i);
		var yp3 = getYP3(i) - getImageCenterY(i);		
		var r = rotation[i];
		xp3 = parseFloat( Math.cos( r * Math.PI/180) * xp3 + Math.sin( r * Math.PI/180 ) * yp3 );		
		return xp3 + getImageCenterX(i);
	}
	function getAngledYP3(i){	
		var xp3 = getXP3(i) - getImageCenterX(i);
		var yp3 = getYP3(i) - getImageCenterY(i);
		var r = rotation[i];
		yp3 = parseFloat( - Math.sin( r * Math.PI/180) * xp3 + Math.cos( r * Math.PI/180) * yp3 );		
		return yp3 + getImageCenterY(i);
	}
	
	function getAngledXP4(i){
		var xp4 = getXP4(i) - getImageCenterX(i);
		var yp4 = getYP4(i) - getImageCenterY(i);		
		var r = rotation[i];
		xp4 = parseFloat( Math.cos( r * Math.PI/180) * xp4 + Math.sin( r * Math.PI/180) * yp4 );
		return xp4 + getImageCenterX(i);		
	}
	function getAngledYP4(i){	
		var xp4 = getXP4(i) - getImageCenterX(i);
		var yp4 = getYP4(i)  - getImageCenterY(i);
		var r = rotation[i];		
		yp4 = parseFloat( - Math.sin( r * Math.PI/180) * xp4 + Math.cos( r * Math.PI/180) * yp4 );	
		return yp4 + getImageCenterY(i);		
	}
	
	function getAngledFXP1(i){	
		var xp1 = getFXP1(i) - getFontCenterX(i);
		var yp1 = getFYP1(i) - getFontCenterY(i);
		var r = fontRotation[i];
		xp1 = parseFloat( Math.cos( r * Math.PI/180) * xp1 + Math.sin( r * Math.PI/180) * yp1 );
		return xp1 + getFontCenterX(i);	
	}
	function getAngledFYP1(i){	
		var xp1 = getFXP1(i) - getFontCenterX(i);
		var yp1 = getFYP1(i) - getFontCenterY(i);
		var r = fontRotation[i];
		yp1 = parseFloat( - Math.sin( r * Math.PI/180) * xp1 + Math.cos( r * Math.PI/180) * yp1 );	
		return yp1 + getFontCenterY(i);			
	}	

	function getAngledFXP2(i){
		var xp2 = getFXP2(i) - getFontCenterX(i);
		var yp2 = getFYP2(i) - getFontCenterY(i);
		var r = fontRotation[i];
		xp2 = parseFloat( Math.cos( r * Math.PI/180) * xp2 + Math.sin( r * Math.PI/180) * yp2 );
		return xp2 + getFontCenterX(i);	
	}
	function getAngledFYP2(i){
		var xp2 = getFXP2(i) - getFontCenterX(i);
		var yp2 = getFYP2(i) - getFontCenterY(i);
		var r = fontRotation[i];
		yp2 = parseFloat( - Math.sin( r * Math.PI/180) * xp2 + Math.cos( r * Math.PI/180) * yp2 );	
		return yp2 + getFontCenterY(i);	
	}	
	function getAngledFXP3(i){
		var xp3 = getFXP3(i) - getFontCenterX(i);
		var yp3 = getFYP3(i) - getFontCenterY(i);
		var r = fontRotation[i];
		xp3 = parseFloat( Math.cos( r * Math.PI/180) * xp3 + Math.sin( r * Math.PI/180) * yp3 );
		return xp3 + getFontCenterX(i);	
	}
	function getAngledFYP3(i){
		var xp3 = getFXP3(i) - getFontCenterX(i);
		var yp3 = getFYP3(i) - getFontCenterY(i);
		var r = fontRotation[i];
		yp3 = parseFloat( - Math.sin( r * Math.PI/180) * xp3 + Math.cos( r * Math.PI/180) * yp3 );	
		return yp3 + getFontCenterY(i);	
	}
	function getAngledFXP4(i){
		var xp4 = getFXP4(i) - getFontCenterX(i);
		var yp4 = getFYP4(i) - getFontCenterY(i);
		var r = fontRotation[i];
		xp4 = parseFloat( Math.cos( r * Math.PI/180) * xp4 + Math.sin( r * Math.PI/180) * yp4 );
		return xp4 + getFontCenterX(i);	
	}
	function getAngledFYP4(i){
		var xp4 = getFXP4(i) - getFontCenterX(i);
		var yp4 = getFYP4(i) - getFontCenterY(i);
		var r = fontRotation[i];
		yp4 = parseFloat( - Math.sin( r * Math.PI/180) * xp4 + Math.cos( r * Math.PI/180) * yp4 );	
		return yp4 + getFontCenterY(i);	
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

	
	function setFontWidth(i,w){	fontWidth[i] = w;	}	
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
	function setFontColor(i,c){	fontColors[i] = "#"+c;	}
	function drawDots(i,isFont){
		
/*		console.log("XP1 "+ getXP1(i) + " YP1 " + getYP1(i) + " XP2 " + getXP2(i) + " YP2 " + getYP2(i)
							+	"\nXP3 "+ getXP3(i) + " YP3 " + getYP3(i) + " XP4 " + getXP4(i) + " YP4 " + getYP4(i) 
							+ "\nAXP2 " + getAngledXP2(i) + " AYP2 " + getAngledYP2(i) + " AXP3 " + getAngledXP3(i) + " AYP3 " + getAngledYP3(i)
							+ "\nAXP4 " + getAngledXP4(i) + " AYP4 " + getAngledYP4(i) + " AXP1 " + getAngledXP1(i) + " AYP1 " + getAngledYP1(i) 
							+ "\nCurX " +getCurrentPointerPositionX() + " CurY " + getCurrentPointerPositionY()
							+ "\nWidth " + imgs[i].width + " height " + imgs[i].height + " angle " + rotation[i]
							);
	*/	
		var rotated = false; 
		// console.log("fontSelected " + isFont );


		if(isFont){
			xp1 = getFXP1(i);	yp1 = getFYP1(i);
			xp2 = getFXP2(i);	yp2 = getFYP2(i);
			xp3 = getFXP3(i);	yp3 = getFYP3(i);
			xp4 = getFXP4(i);	yp4 = getFYP4(i);

			axp1 = getAngledFXP1(i);	ayp1 = getAngledFYP1(i);
			axp2 = getAngledFXP2(i);	ayp2 = getAngledFYP2(i);
			axp3 = getAngledFXP3(i);	ayp3 = getAngledFYP3(i);
			axp4 = getAngledFXP4(i);	ayp4 = getAngledFYP4(i);		

			cx = getFontCenterX(i);	cy = getFontCenterY(i);
			w = getFontWidth(i); h = getFontHeight(i);
			ctx.font = "10px Arial";
			// console.log(	"xp1 " + xp1 + " yp1 " + yp1 + " xp2 " + xp2 + " yp2 " + yp2 + " xp3 " + xp3 + " yp3 " + yp3 + " xp4 " + xp4 + " yp4 " + yp4	);
			// console.log(	"cur X " + getCurrentPointerPositionX() + " cur Y " +getCurrentPointerPositionY() + " target # "+i + " rotation " + fontRotation[i]);
			if(fontRotation[i] != 0){
				ctx.translate(-xp1 - w/2,-yp1 - h/2);
				rotated = true; 
			}

		}else{
			xp1 = getXP1(i);	yp1 = getYP1(i);
			xp2 = getXP2(i);	yp2 = getYP2(i);
			xp3 = getXP3(i);	yp3 = getYP3(i);
			xp4 = getXP4(i);	yp4 = getYP4(i);

			axp1 = getAngledXP1(i);	ayp1 = getAngledYP1(i);
			axp2 = getAngledXP2(i);	ayp2 = getAngledYP2(i);
			axp3 = getAngledXP3(i);	ayp3 = getAngledYP3(i);
			axp4 = getAngledXP4(i);	ayp4 = getAngledYP4(i);		
			ctx.font = "10px Arial";
			cx = getImageCenterX(i); cy = getImageCenterY(i);
			w = imgs[i].width; h = imgs[i].height;
			if(rotation[i] != 0){
				ctx.translate(-xp1 -w/2 ,-yp1 - h/2 );			
				rotated = true; 
			}
		}
		ctx.beginPath();
		ctx.arc(axp1,ayp1,resizeRad,0,pi2,false);		
		ctx.stroke();	
		ctx.beginPath();
		ctx.arc(axp2,ayp2,resizeRad,0,pi2,false);		
		ctx.stroke();	
		ctx.beginPath();
		ctx.arc(axp3,ayp3,resizeRad,0,pi2,false);		
		ctx.stroke();	
		ctx.beginPath();
		ctx.arc(axp4,ayp4,resizeRad,0,pi2,false);		
		ctx.stroke();	
		ctx.beginPath();
		ctx.arc(cx,cy,resizeRad,0,pi2,false);		
		ctx.stroke();	

		ctx.fillText("NONE", axp1,ayp1);
		ctx.fillText("<- Image Width ->", axp2,ayp2);
		ctx.fillText("<- Image Height ->", axp3,ayp3);
		ctx.fillText("<- Image Height & Width ->",axp4,ayp4);
		ctx.fillText("Moving Center",cx,cy);
		

		if(rotated){
			ctx.translate(getDefaultWidth(),getDefaultHeight());
		}
		
	}
	
	
	function getElemNumber(e){
		// console.log(imageCount + "Element Number x" + parseInt(e.clientX - offsetX) + " y: " + parseInt(e.clientY - offsetY));
		setCurrentPointerPosition(e);
		// element is not selected 
		if(fontCounts > 0){
			for(x=0; x < fonts.length; x++){
				
				if(strs[x] != ''){
					/* console.log("FXP1 "+ getFXP1(x) + " FYP1 " + getFYP1(x) + " FXP2 " + getFXP2(x) + " FYP2 " + getFYP2(x)
							+	"\nFXP3 "+ getFXP3(x) + " FYP3 " + getFYP3(x) + " FXP4 " + getFXP4(x) + " FYP4 " + getFYP4(x) 
							+ "\nAFXP2 " + getAngledFXP2(x) + " AFYP2 " + getAngledFYP2(x) + " AFXP3 " + getAngledFXP3(x) + " AFYP3 " + getAngledFYP3(x)
							+ "\nAFXP4 " + getAngledFXP4(x) + " AFYP4 " + getAngledFYP4(x) + "AFXP1 " + getAngledFXP1(x) + " AFYP1 " + getAngledFYP1(x) 
							+ "\nCurX " + getCurrentPointerPositionX() + " CurY " + getCurrentPointerPositionY()
							
							);
*/
					if((getCurrentPointerPositionX() >= getFXP1(x) - resizeRad && getCurrentPointerPositionX() <= getFXP2(x) + resizeRad 
						&& getCurrentPointerPositionY() >= getFYP1(x) - resizeRad   && getCurrentPointerPositionY() <= getFYP3(x) + resizeRad )
						|| (getCurrentPointerPositionX() >= getFMinX(x) - resizeRad && getCurrentPointerPositionX() <= getFMaxX(x) + resizeRad
						&& getCurrentPointerPositionY() >= getFMinY(x) - resizeRad && getCurrentPointerPositionY() <= getFMaxY(x) + resizeRad)  
					){					
						// console.log("font Contents no. " + x);						
						return x; 
					}
				}
			}
		}
		if(imageCount > 0){
			for(w=0;w< imgs.length; w++){			
					
				if(imgs[w] != null){	
					/* console.log("XP1 "+ getXP1(w) + " YP1 " + getYP1(w) + " XP2 " + getXP2(w) + " YP2 " + getYP2(w)
							+	"\nXP3 "+ getXP3(w) + " YP3 " + getYP3(w) + " XP4 " + getXP4(w) + " YP4 " + getYP4(w) 
							+ "\nAXP2 " + getAngledXP2(w) + " AYP2 " + getAngledYP2(w) + " AXP3 " + getAngledXP3(w) + " AYP3 " + getAngledYP3(w)
							+ "\nAXP4 " + getAngledXP4(w) + " AYP4 " + getAngledYP4(w) + "AXP1 " + getAngledXP1(w) + " AYP1 " + getAngledYP1(w) 
							+ "\nCurX " +getCurrentPointerPositionX() + " CurY " + getCurrentPointerPositionY()
							+ "\nWidth " + imgs[w].width + " height " + imgs[w].height + " angle " + rotation[w]
							);

*/
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
				if(( getCurrentPointerPositionX() <= getFXP1(num) + resizeRad && getCurrentPointerPositionX() >= getFXP1(num) - resizeRad 
					&& getCurrentPointerPositionY() <= getFYP1(num) + resizeRad && getCurrentPointerPositionY() >= getFYP1(num) - resizeRad  )
					/*|| ( getCurrentPointerPositionX() <= getAngledFXP1(num) + resizeRad && getCurrentPointerPositionX() >= getAngledFXP1(num) - resizeRad 
					&& getCurrentPointerPositionY() <= getAngledFYP1(num) + resizeRad  && getCurrentPointerPositionY() >= getAngledFYP1(num)  - resizeRad ) */
					){
					return 1;
				}
				if((getCurrentPointerPositionX() <= getFXP2(num) + resizeRad && getCurrentPointerPositionX() >= getFXP2(num) - resizeRad 
					&& getCurrentPointerPositionY() <= getFYP2(num) + resizeRad && getCurrentPointerPositionY() >= getFYP2(num) - resizeRad )  
					/*|| ( getCurrentPointerPositionX() <= getAngledFXP2(num) + resizeRad && getCurrentPointerPositionX() >= getAngledFXP2(num) - resizeRad 
					&& getCurrentPointerPositionY() <= getAngledFYP2(num) + resizeRad  && getCurrentPointerPositionY() >= getAngledFYP2(num)  - resizeRad ) */
					){
					return 2;
				}
				if((getCurrentPointerPositionX() <= getFXP3(num) + resizeRad && getCurrentPointerPositionX() >= getFXP3(num) - resizeRad 
					&& getCurrentPointerPositionY() <= getFYP3(num) + resizeRad && getCurrentPointerPositionY() >= getFYP3(num) - resizeRad )
					/*|| ( getCurrentPointerPositionX() <= getAngledFXP3(num)  + resizeRad && getCurrentPointerPositionX() >= getAngledFXP3(num) - resizeRad 
					&& getCurrentPointerPositionY() <= getAngledFYP3(num)  + resizeRad && getCurrentPointerPositionY() >= getAngledFYP3(num) - resizeRad  ) */
					){
					return 3;
				}
				if(( getCurrentPointerPositionX() <= getFXP4(num) + resizeRad && getCurrentPointerPositionX() >= getFXP4(num) - resizeRad
					&& getCurrentPointerPositionY() <= getFYP4(num) + resizeRad && getCurrentPointerPositionY() >= getFYP4(num) - resizeRad )
					/*|| ( getCurrentPointerPositionX() <= getAngledFXP4(num)  + resizeRad && getCurrentPointerPositionX() >= getAngledFXP4(num) - resizeRad 
					&& getCurrentPointerPositionY() <= getAngledFYP4(num)  + resizeRad && getCurrentPointerPositionY() >= getAngledFYP4(num) - resizeRad  )*/
				){
					return 4;
				}
			}
			else if(isImgElem(e)){
				if((getCurrentPointerPositionX() <= getXP1(num) + resizeRad && getCurrentPointerPositionX() >= getXP1(num) - resizeRad 
				 && getCurrentPointerPositionY() <= getYP1(num) + resizeRad && getCurrentPointerPositionY() >= getYP1(num) - resizeRad  )
				){
					return 1;
				}
				if((getCurrentPointerPositionX() <= getXP2(num) + resizeRad && getCurrentPointerPositionX() >= getXP2(num) - resizeRad 
				 	&& getCurrentPointerPositionY() <= getYP2(num) + resizeRad && getCurrentPointerPositionY() >= getYP2(num) - resizeRad )  
				 	/*||(rotation[num] != 0 && rotation[num] != 360)
				 	&&(getCurrentPointerPositionX() <= getAngledXP2(num) + resizeRad && getCurrentPointerPositionX() >= getAngledXP2(num) - resizeRad 
				 	&& getCurrentPointerPositionY() <= getAngledYP2(num) + resizeRad  && getCurrentPointerPositionY() >= getAngledYP2(num)  - resizeRad )*/ 
				){
					return 2;
				}
				if(
					(getCurrentPointerPositionX() <= getXP3(num) + resizeRad && getCurrentPointerPositionX() >= getXP3(num) - resizeRad 
					&& getCurrentPointerPositionY() <= getYP3(num) + resizeRad && getCurrentPointerPositionY() >= getYP3(num) - resizeRad )
					/*|| (rotation[num] != 0 && rotation[num] != 360)
					&&( getCurrentPointerPositionX() <= getAngledXP3(num)  + resizeRad && getCurrentPointerPositionX() >= getAngledXP3(num) - resizeRad 
					&& getCurrentPointerPositionY() <= getAngledYP3(num)  + resizeRad && getCurrentPointerPositionY() >= getAngledYP3(num) - resizeRad  )*/
					){
					return 3;
				}
				if(
					( getCurrentPointerPositionX() <= getXP4(num) + resizeRad && getCurrentPointerPositionX() >= getXP4(num) - resizeRad
					&& getCurrentPointerPositionY() <= getYP4(num) + resizeRad && getCurrentPointerPositionY() >= getYP4(num) - resizeRad )
					/*|| (rotation[num] != 0 && rotation[num] != 360)
					&&( getCurrentPointerPositionX() <= getAngledXP4(num)  + resizeRad && getCurrentPointerPositionX() >= getAngledXP4(num) - resizeRad 
					&& getCurrentPointerPositionY() <= getAngledYP4(num)  + resizeRad && getCurrentPointerPositionY() >= getAngledYP4(num) - resizeRad  )*/
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
		// console.log("isResizeable");
		num = getElemNumber(e);
		// console.log("num " + num);
		// selected P1
		if(num != -1){
			if(isFontElem(e)){
				if( 
					// (curPosX <= getFXP1(num) + resizeRad && curPosX >= getFXP1(num) - resizeRad && curPosY <= getFYP1(num) + resizeRad && curPosY >= getFYP1(num) - resizeRad  )
				  //|| (curPosX <= getFXP2(num) + resizeRad && curPosX >= getFXP2(num) - resizeRad && curPosY <= getFYP2(num) + resizeRad && curPosY >= getFYP2(num) - resizeRad  )
					// (curPosX <= getFXP3(num) + resizeRad && curPosX >= getFXP3(num) - resizeRad && curPosY <= getFYP3(num) + resizeRad && curPosY >= getFYP3(num) - resizeRad  )
				  (curPosX <= getFXP4(num) + resizeRad && curPosX >= getFXP4(num) - resizeRad && curPosY <= getFYP4(num) + resizeRad && curPosY >= getFYP4(num) - resizeRad  )
				 // || (curPosX <= getAngledFXP2(num) + resizeRad  && curPosX >= getAngledFXP2(num) - resizeRad  && curPosY <= getAngledFYP2(num)+ resizeRad  && curPosY >= getAngledFYP2(num) - resizeRad  )
				 // || (curPosX <= getAngledFXP3(num) + resizeRad  && curPosX >= getAngledFXP3(num) - resizeRad  && curPosY <= getAngledFYP3(num)+ resizeRad  && curPosY >= getAngledFYP3(num) - resizeRad  )
				 || (curPosX <= getAngledFXP4(num) + resizeRad && curPosX >= getAngledFXP4(num) - resizeRad && curPosY <= getAngledFYP4(num) + resizeRad && curPosY >= getAngledFYP4(num) - resizeRad )
				){
					return true;
				}
			}
			else if(isImgElem(e)){
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
		// console.log("mouseDown" + "\nCurX " +getCurrentPointerPositionX() + " CurY " + getCurrentPointerPositionY());
		// console.log("Width : " + parseFloat(ctx.measureText(strs[0]).width));
		// console.log("FX1 : " + getAngledFXP1(0) + " FY1 " + getAngledFYP1(0));
		// capture all the elements coordinate 	
		if(isFontElem(e)){		
			num = getElemNumber(e);
			if(num >-1){
				$("#img-ctling").empty().append("Currently Selected Font No. " + num  + " rotation angle "+ getAngle(num,getSelected()));
				 selectedElementNo = num;
			}
			else{
				$("#img-ctling").empty();
			}
		}
		else if(isImgElem(e))
		{	
			
			num = getElemNumber(e);
			if(num >-1){
				$("#img-ctling").empty().append("Currently Selected Image No. " + num  + " rotation angle "+ getAngle(num,getSelected()));
				 selectedElementNo = num;
			}
			else{
				$("#img-ctling").empty();
			}
			
		}
		if(isResizable(e)){
			// console.log("resizable");
			resizeable = true; 
			draggable = false; 
			selectedPoint = getSelectedPoint(e);
			// console.log("selected Point "+ selectedPoint);
		}
		else{
			// console.log("draggable ");
			resizeable = false; 
			draggable = true; 
		}				
	}

	var angle = 0; 
	
	function setAngle(value,k,isFont){
		angle = 360 - value;
		if(isFont){
			// console.log("font rotation " + k);
			fontRotation[k-1] = angle;
		}else{
			// console.log("image rotation " + k);
			rotation[k] = angle;	
		}
		// console.log(angle);
	}

	
	function getDistanceOf(x1,y1,x2,y2){
		return Math.sqrt( (x2-x1)*(x2-x1) + (y2-y1)*(y2-y1) );
	}
	function isFontElem(e){
		// console.log("isFontElem " + fontCounts);
		setCurrentPointerPosition(e);
		
		for(i = 0; i < fontCounts; i++){
			// console.log(i+ " FXP1 " + getFXP1(i) + " FYP1 " + getFYP1(i) + " FX2 " + getFXP2(i) + " FYP3 " + getFYP3(i) + " curX "+ getCurrentPointerPositionX() +" cur Y "+ getCurrentPointerPositionY());
			// console.log(i+ " AFXP1 " + getAngledFXP1(i) + " AFYP1 " + getAngledFYP1(i) + " AFX2 " + getAngledFXP2(i) + " AFYP3 " + getAngledFYP3(i) );
			if(strs[i] != ''){
				if( (getCurrentPointerPositionX() >= getFXP1(i) - resizeRad && getCurrentPointerPositionX() <= getFXP2(i) + resizeRad
					&& getCurrentPointerPositionY() >= getFYP1(i) - resizeRad && getCurrentPointerPositionY() <= getFYP3(i) + resizeRad )
					/*|| (getCurrentPointerPositionX() >= getAngledFXP1(i) - resizeRad && getCurrentPointerPositionX() <= getAngledFXP2(i) + resizeRad
					&& getCurrentPointerPositionY() >= getAngledFYP1(i) - resizeRad && getCurrentPointerPositionY() <= getAngledFYP3(i) + resizeRad )*/
					){
					// console.log("this is font elem ");
					setSelected(true);
					return true; 
				}
			}
		}
		
		// console.log("this is not a font: fontCounts "+ fontCounts + " str[0] " + strs[0] );
	//setSelected(false);
		return false; 		
	}
	function isImgElem(e){
		
		setCurrentPointerPosition(e);
		
		for(i = 0; i < imageCount; i++){
			// console.log("@@@@@@ Image Count "+ imageCount + " i "+ i + " imgs "+ imgs[i]);
			if(imgs[i] != null){
				if( (getCurrentPointerPositionX() >= getXP1(i) - resizeRad && getCurrentPointerPositionX() <= getXP2(i) + resizeRad
					&& getCurrentPointerPositionY() >= getYP1(i) - resizeRad && getCurrentPointerPositionY() <= getYP3(i) + resizeRad )
					|| (getCurrentPointerPositionX() >= getAngledXP1(i) - resizeRad && getCurrentPointerPositionX() <= getAngledXP2(i) + resizeRad
					&& getCurrentPointerPositionY() >= getAngledYP1(i) - resizeRad && getCurrentPointerPositionY() <= getAngledYP3(i) + resizeRad )
					){
					
					setSelected(false);
					return true; 
				}
			}
		}
		return false; 		
	}
	function mouseMove(e){
		// console.log("mouseMove");
	//	if(draggingResizer > -1){			
			// drag action here 

			if(draggable){
				ctx.clearRect(0,0,canvas.width,canvas.height);		
				// console.log(img+ " " + e + " " +imgLoader[0]);
				// font action 
				if(isFontElem(e)){										
					fontNum = getElemNumber(e);
					// console.log("font NUm " + fontNum );
					if(typeof fonts[fontNum] != 'undefined'){
						setCurrentPointerPosition(e);																					
						fontStartX[fontNum] = getCurrentPointerPositionX() - getDistanceOf(getFXP1(fontNum),getFYP1(fontNum),getFontCenterX(fontNum),getFontCenterY(fontNum)) /1000;
						fontStartY[fontNum] = getCurrentPointerPositionY() - getDistanceOf(getFXP1(fontNum),getFYP1(fontNum),getFontCenterX(fontNum),getFontCenterY(fontNum)) /1000;	

						// console.log("Font Start x1 : " + fontStartX[fontNum] + " y1: " + fontStartY[fontNum]);
					
					}
					// setSelected(false);
				}
				// image action 
				else if(isImgElem(e)){
					num = getElemNumber(e);
					if(typeof imgs[num] != 'undefined'){
						setCurrentPointerPosition(e);										
											
						imgStartX[num] = getCurrentPointerPositionX() - getDistanceOf(getXP1(num),getYP1(num),getImageCenterX(num),getImageCenterY(num))/1000;
						imgStartY[num] = getCurrentPointerPositionY() - getDistanceOf(getXP1(num),getYP1(num),getImageCenterX(num),getImageCenterY(num))/1000;				

						// console.log(imgs[num]+ " "+ imgStartX[num] +" "+ imgStartY[num]+ " " +imgs[num].width+" "+imgs[num].height);											
					}					
				}
				draw(false,false);				
			}
			// resize action here 
			else if(resizeable){
				if(isFontElem(e)){	
					// console.log("resizeable selectedPoint " + selectedPoint);
					switch (selectedPoint){
						case 1:
							// resize P1, P3
							// console.log("case 1");
							setCurrentPointerPosition(e);											
							break;
							
						case 2:
							// resize P1,P2
							// console.log("case 2");
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
							// console.log("case 3");	
							setCurrentPointerPosition(e);							
							if(num != -1){
								if(getCurrentPointerPositionY() != getFYP3(num) && getCurrentPointerPositionY() != getFYP1(num) ){
									diff = parseInt(getCurrentPointerPositionY() - getFYP1(num));
									console.log("new height " + diff);								
									setFontSize(num, diff);
								}							
								draw(false,false);
							}
							
							break;
						case 4:
							// resize P3, P4
							setCurrentPointerPosition(e);						
							// console.log("case 4 " + (getCurrentPointerPositionX(e) - offsetX) + " " + (getCurrentPointerPositionY(e) - offsetY) + " " + num );
							// shrinking returns number 
							if(num != -1){
								if(getCurrentPointerPositionY() != getFYP3(num) && getCurrentPointerPositionY() != getFYP4(num)){
									diff = parseInt(getCurrentPointerPositionY() - getFYP2(num));
									
									// console.log("new height " + diff);
									setFontSize(num, diff);
								}							
								if((getCurrentPointerPositionX() != getFXP3(num) && getCurrentPointerPositionX() != getFXP4(num))							
								){
									diff = parseInt(getCurrentPointerPositionX() - getFXP3(num));
									// console.log("new width " + diff);
									setFontWidth(num, diff);						
								}
								draw(false,false);
							} 						
							break;
					}
				}
				else if(isImgElem(e)){					
					// console.log("resizeable selectedPoint " + selectedPoint);
					switch (selectedPoint){
						case 1:
							// resize P1, P3
							// console.log("case 1");
							setCurrentPointerPosition(e);											
							break;
							
						case 2:
							// resize P1,P2
							// console.log("case 2");
							setCurrentPointerPosition(e);	
							if(num != -1){								
								if(getCurrentPointerPositionX() != getXP2(num) && getCurrentPointerPositionX() != getXP1(num)){
									diff = parseFloat(getCurrentPointerPositionX() - getXP3(num));
									// console.log("new width " + diff);
									setImageWidth(num, diff);						
								}
								draw(false,false);
							} 
							break;
						case 3:
							// resize P3, P1
							// console.log("case 3");	
							setCurrentPointerPosition(e);							
							if(num != -1){
								if(getCurrentPointerPositionY() != getYP3(num) && getCurrentPointerPositionY() != getYP1(num) ){
									diff = parseFloat(getCurrentPointerPositionY() - getYP1(num));
									// console.log("new height " + diff);
									setImageHeight(num, diff);
								}							
								draw(false,false);
							}
							
							break;
						case 4:
							// resize P3, P4
							setCurrentPointerPosition(e);						
							// console.log("case 4 " + (getCurrentPointerPositionX(e) - offsetX) + " " + (getCurrentPointerPositionY(e) - offsetY) + " " + num );
							// shrinking returns number 
							if(num != -1){
								if(getCurrentPointerPositionY() != getYP3(num) && getCurrentPointerPositionY() != getYP4(num) ){
									diff = parseFloat(getCurrentPointerPositionY() - getYP2(num));
									
									// console.log("new height " + diff);
									setImageHeight(num, diff);
								}							
								if((getCurrentPointerPositionX() != getXP3(num) && getCurrentPointerPositionX() != getXP4(num))							
								){
									diff = parseFloat(getCurrentPointerPositionX() - getXP3(num));
									// console.log("new width " + diff);
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
		// console.log("mouseUp");
		setCurrentPointerPosition(e);
		draggable = false; 
		resizeable = false;
		num = -1;
		draw(true,false);
		// test 
		//printStrs();
	}
	
	function mouseOut(e){
		// console.log("mouseOut");
		mouseUp(e);
	}
	
	function rescale(sca){
		// console.log("rescale");
		canvas.save();
		canvas.width = getWidth() * sca / 100;
		canvas.height = getHeight() * sca / 100;
	}

	function updateCanvas(){
		// console.log("updateCanvas");
		clear();
		
		
		// syntax note 
		// context.drawImage(img ,sx ,sy ,swidth ,sheight ,x ,y ,width ,height );
		
		ctx.drawImage(snowboard,0,parseInt(getWindowHeight()*0.1),getWidth(),getHeight());
		ctx.save();
		
	}
	
	function zoom(){
		// console.log("zoom");
		var pt = ctx.transformedPoint(prevX,prevY);
		
	}
	
	function clear(){
		// console.log("clear");
		var p1 = ctx.transformedPoint(0,0); // left top 
		var p2 = ctx.transformedPoint(canbas.width, canvas.height);
		ctx.clearRect(p1.x, p1.y, p2.x-p1.x, p2.y-p1.y);
	}
	
	function hitImg(x,y){
		// console.log("hitImg");
		return (x > imgX && x < imgX + imgWidth && y > imgY && y < imgY + imgHeight); 
	}

	var pi2 = Math.PI * 2;
	var pi = Math.PI;
	function draw(img,anchor, boarder){
	// console.log("draw");
		// clear the canvas 
		ctx.clearRect(0,0,canvas.width,canvas.height);
		ctx.drawImage(snowboard, 0, parseInt(getWindowHeight()*0.1),getDefaultWidth(),getDefaultHeight());	
		// drawing / restoring fonts 
		if(fontCounts > -1){
			for(f = 0; f <= fonts.length; f++){
				ctx.save();
				if(strs[f] != ''){	
					// console.log("****** font rotation ****");
					// console.log("rotation rate : "+ fontRotation[f]);			
					if(fontRotation[f]!= 0 ){
						// console.log("Font Rotation in Draw");
						ctx.translate(getFontCenterX(f),getFontCenterY(f));
						ctx.rotate(fontRotation[f]*Math.PI/180);
						ctx.font = getFontString(f);
						ctx.fillStyle=getFontColor(f);			
						ctx.fillText(strs[f],-getFontCenterX(f)+getFXP3(f) , - getFontCenterY(f) + getFYP3(f));	
						//setSelected(true);	
						setFontWidth(f,parseFloat(ctx.measureText(strs[f]).width));
						drawDots(f,true);
						
						ctx.translate(getDefaultWidth(),getDefaultHeight());	

					}
					else{				
						// console.log("font in draw " + getFontString(f));														
						ctx.font = getFontString(f);
						ctx.fillStyle = getFontColor(f);
						ctx.fillText(strs[f], getFXP3(f), getFYP3(f));		
						//setSelected(true);		
						setFontWidth(f,parseFloat(ctx.measureText(strs[f]).width));
						drawDots(f,true);

					}	
					
					ctx.restore();
				}	

			}
			
		}
		// drawing / restoring images 
		if(imageCount >-1){
			for(p = 0; p< imgs.length;p++){						
				ctx.save();
				// console.log("imgs[p] " + imgs[p] );
				if(imgs[p] != null){
					// console.log("****** image rotation ****");
					// console.log("rotation rate : "+ rotation[p]);		
					setImageRadious(p);
					// rotating 
					if(rotation[p] != 0){
						
						ctx.translate(getImageCenterX(p) , getImageCenterY(p) );
						// console.log("image center X "+ getImageCenterX(p) + " image center Y " +  getImageCenterY(p) + " XP1 " + getXP1(p) + " YP1 " +getYP1(p));				

						ctx.rotate(rotation[p]*Math.PI/180);
						
						// here need to track all the corners of image 
						ctx.drawImage(imgs[p],-getImageWidth(p)/2, -getImageHeight(p)/2,imgs[p].width,imgs[p].height);						
						drawDots(p,false);
						ctx.translate(getDefaultWidth(),getDefaultHeight());				
					}
					else{
						ctx.drawImage(imgs[p],getXP1(p),getYP1(p),imgs[p].width,imgs[p].height);				
						drawDots(p,false);
					}									
					ctx.restore();		
				}
			}
		}
	}

	function setFrontData(){
		frontData = {
			"side": "front",
			"images":getImagesDATA(),
			"fonts":getFontsDATA(),
			"backgroundColor":"#FFFFFF"
		}
		// console.log("frontData" + frontData );
	}
	
	function setBackData(){
		backData = {
			"side": "back",
				"images":getImagesDATA(),
				"fonts":getFontsDATA(),
				"backgroundColor":"#FFFFFF"
		}
		// console.log("backData" + backData );
	}

	function getImagesDATA(){
		var image = [];
		var d = [];
		var ind = 0;
		for(ind; ind < imageCount; ind++){
			image[ind] = {
				"imgURL":"","xp1":getXP1(ind),	"xp2":getXP2(ind),	"xp3":getXP3(ind),	"xp4":getXP4(ind), 
				"yp1":getYP1(ind), "yp2": getYP2(ind), "yp3": getYP3(ind), "yp4": getYP4(ind), "ayp1": getAngledYP1(ind), "ayp2": getAngledYP2(ind), "ayp3": getAngledYP3(ind), "ayp4": getAngledYP4(ind),
				"axp1":getAngledXP1(ind),	"axp2":getAngledXP2(ind),	"axp3":getAngledXP3(ind),	"axp4":getAngledXP4(ind),	"angle":getAngle(ind,true),"width":getImageWidth(ind),"height":getImageHeight(ind),
				"scale":getScale() 	
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
				"font":"text",	"fxp1":getFX1(ind),	"fxp2":getFX2(ind),	"fxp3":getFX3(ind),	"fxp4":getFX4(ind),"fyp1":getFY1(ind),	"fyp2":getFY2(ind),	"fyp3":getFY3(ind),	"fyp4":getFY4(ind),	
				"afxp1":getAngledFXP1(ind),	"afxp2":getAngledFXP1(ind),	"afxp3":getAngledFXP1(ind),	"afxp4":getAngledFXP1(ind),"afyp1":getAngledFYP1(ind),	"afyp2":getAngledFYP2(ind),	"afyp3":getAngledFYP3(ind),	
				"afyp4":getAngledFYP4(ind),"angle":getAngle(ind,false),"width":getFontWidth(ind),"height":getFontHeight(ind), "scale":getScale() 	
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
		sendData(data);
	}

	// send data that created in saveData 
	function sendData(postData){
		$.ajax({
		  type: "POST",
		  url: "editor/saveboard",
		  data: postData[0],
		  contentType: "application/json",
		  success: function(data) {		      
		      alert("success");
		  },
		  error: function (XMLHttpRequest, textStatus, errorThrown) {		  	
		    alert("fail");
		  }
	 	});

	 //$.post("editor/saveboard",{data: postData[0]}).done(function(d) {
   //	console.log(d);
   //});
		
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