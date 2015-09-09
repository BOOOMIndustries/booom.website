<!--**
*  Bottom nav 
*   this section includes 
*    - snowboard map 
*    - zoom in button
* 	 - zoom out button 
*-->
<!-- image uploader -->
<div id="images-ctl" class="hide palet-content container rounded_corner draggable">
	<div class="row">
		<div class="col-md-12">
			<i class="fa fa-times-circle-o close-window right"></i>
			<h3>Upload Images</h3>						
		</div>
		<div id="i1" class="col-md-12">
			<input type="file" id="imgLoader" class="imgLoader" name="imgLoader" />
			<div id="rot1" class="btn rrd rot "><i class="fa fa-repeat"></i></div>
			<div id="res1" class="btn rrd res "><i class="fa fa-arrows-alt"></i></div>
			<div id="dor1" class="btn rrd dor "><i class="fa fa-adjust"></i></div>
			<div id="del1" class="btn del"><i class="fa fa-trash-o"></i></div>
		</div>
		<div id="i2" class="col-md-12 hide">
			<input type="file" id="imgLoader2" class=" imgLoader" name="imgLoader" />
			<div id="rot2" class="btn rrd rot "><i class="fa fa-repeat"></i></div>
			<div id="res2" class="btn rrd res "><i class="fa fa-arrows-alt"></i></div>
			<div id="dor2" class="btn rrd dor "><i class="fa fa-adjust"></i></div>
			<div id="del2" class="btn del "><i class="fa fa-trash-o"></i></div>
		</div> 
		<div id="i3" class="col-md-12 hide">
			<input type="file" id="imgLoader3" class=" imgLoader" name="imgLoader" />
			<div id="rot3" class="btn rrd rot "><i class="fa fa-repeat"></i></div>
			<div id="res3" class="btn rrd res "><i class="fa fa-arrows-alt"></i></div>
			<div id="dor3" class="btn rrd dor "><i class="fa fa-adjust"></i></div>
			<div id="del3" class="btn del "><i class="fa fa-trash-o"></i></div>
		</div> 
		<div id="i4" class="col-md-12 hide">
			<input type="file" id="imgLoader4" class=" imgLoader" name="imgLoader" />
			<div id="rot4" class="btn rrd rot "><i class="fa fa-repeat"></i></div>
			<div id="res4" class="btn rrd res "><i class="fa fa-arrows-alt"></i></div>
			<div id="dor4" class="btn rrd dor "><i class="fa fa-adjust"></i></div>
			<div id="del4" class="btn del "><i class="fa fa-trash-o"></i></div>
		</div> 
		<div id="i5" class="col-md-12 hide">
			<input type="file" id="imgLoader5" class=" imgLoader" name="imgLoader" />
			<div id="rot5" class="btn rrd rot "><i class="fa fa-repeat"></i></div>
			<div id="res5" class="btn rrd res "><i class="fa fa-arrows-alt"></i></div>
			<div id="dor5" class="btn rrd dor "><i class="fa fa-adjust"></i></div>
			<div id="del5" class="btn del "><i class="fa fa-trash-o"></i></div>
		</div> 		
		<div class="col-md-12">
			<div id="add_image" class="btn"><i class="fa fa-plus"></i></div>
		</div>
	</div>
</div>

<!-- image controller bottom -->
<div id="image-editor-ctl" class="hide rounded_corner container draggable">
	<div class="row">
		<div class="col-md-12">
			<i class="fa fa-times-circle-o close-window right"></i>
			<h3>Rotation Controller</h3>
			<p id="img-ctling"></p>
		</div>
		<div id="ctr-content" class="col-md-2">
			<div id='rotationSlider' class='slider' ></div>			
		</div>
	</div>
</div>
<!-- 
<div id="images-ctl" class="images-content hide">
	<i class="fa fa-times-circle-o close-window"></i>
	
	<form action="/file-upload" class="dropzone" accept="image/*">	  
	  <input name="file" type="file" class="hide"/>	  
	  <div class="dz-message big-border">
	  	<p class="center-text">Drop A Picture Here</p>
	  </div>
	</form>
</div>
-->
<!-- size  -->
<div id="size-ctl" class="size-content hide palet-content front container rounded_corner draggable">
	<div class="row">
		<div class="col-md-12">
			<i class="fa fa-times-circle-o close-window right"></i>
			<h1>Size</h1>	
		</div>
		<div class="col-md-3">
			<label class="btn btn-default col-md-4"><input type="radio" name="size" value="158">158 cm</label>
		</div>
		<div class="col-md-3">
			<label class="btn btn-default col-md-4"><input type="radio" name="size" value="160">160 cm</label>			
		</div>
		<div class="col-md-3">
			<label class="btn btn-default col-md-4"><input type="radio" name="size" value="163">163 cm</label>			
		</div>
	</div>
</div>

<!-- style -->
<div id="style-ctl" class="style-content container hide palet-content rounded_corner draggable">
	<div class="row">
		<div class="col-md-12">
			<i class="fa fa-times-circle-o close-window right"></i>
			<h1>Style</h1>
		</div>
		<div class="col-md-4">			
			<p>Description about Standard here. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo. Quisque sit amet est et sapien ullamcorper pharetra. Vestibulum erat wisi, condimentum sed, commodo vitae, </p>
			<label class="btn btn-default center-block"><input type="radio" name="board" value="standard"/> Standard</label>
		</div>
		<div class="col-md-4">			
			<p>Description about jib-rocker here Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo. Quisque sit amet est et sapien ullamcorper pharetra. Vestibulum erat wisi, condimentum sed, commodo vitae,</p>
			<label class="btn btn-default center-block"><input type="radio" name="board" value="jib-rocker" /> Jib-rocker</label>
		</div>
		<div class="col-md-4">			
			<p>Description about parkboard here Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo. Quisque sit amet est et sapien ullamcorper pharetra. Vestibulum erat wisi, condimentum sed, commodo vitae, ornare</p>
			<label class="btn btn-default center-block"><input type="radio" name="board" value="park board" /> park-board</label>
		</div>
	</div>	
</div>

<!-- font -->
<div id="font-ctl" class="font-content container hide palet-content draggable rounded_corner">
	<div class="row">
		<div class="col-md-12">
			<i class="fa fa-times-circle-o close-window right"></i>
			<h3>Font</h3>
		</div>
		<!-- font fields -->
		<div id="f1" class="active col-md-12 font_form_wrapper">
			<div class="col-md-3 form_group">
				<input id="font-1" class="front fonts form-control" />
			</div>
			<div class="col-md-3">
				<?php echo include("font_options.php"); ?>
			</div>
			<div class="col-md-6">
				<div id="frot1" class="btn frrd rot "><i class="fa fa-repeat"></i></div>
				<div id="fres1" class="btn frrd res "><i class="fa fa-arrows-alt"></i></div>
				<div id="fdor1" class="btn frrd dor "><i class="fa fa-adjust"></i></div>
				<div id="fdel1" class="btn del"><i class="fa fa-trash-o"></i></div>
				<div class="btn btn-default add-font 1">Insert Text</div>
			</div>
		</div>
		
		<div id="f2" class="hide col-md-12 font_form_wrapper">
			<div class="col-md-3 form_group">
				<input id="font-2" class="front fonts form-control" />
			</div>
			<div class="col-md-3">
				<?php echo include("font_options.php"); ?>
			</div>
			<div class="col-md-6">
				<div id="frot2" class="btn frrd rot "><i class="fa fa-repeat"></i></div>
				<div id="fres2" class="btn frrd res "><i class="fa fa-arrows-alt"></i></div>
				<div id="fdor2" class="btn frrd dor "><i class="fa fa-adjust"></i></div>
				<div id="fdel2" class="btn del"><i class="fa fa-trash-o"></i></div>
				<div class="btn btn-default add-font 2">Insert Text</div>
			</div>
		</div>

		<div id="f3" class="hide col-md-12 font_form_wrapper">
			<div class="col-md-3 form_group">
				<input id="font-3" class="front fonts form-control" />
			</div>
			<div class="col-md-3">
				<?php echo include("font_options.php"); ?>
			</div>
			<div class="col-md-6">
				<div id="frot3" class="btn frrd rot "><i class="fa fa-repeat"></i></div>
				<div id="fres3" class="btn frrd res "><i class="fa fa-arrows-alt"></i></div>
				<div id="fdor3" class="btn frrd dor "><i class="fa fa-adjust"></i></div>
				<div id="fdel3" class="btn del"><i class="fa fa-trash-o"></i></div>
				<div class="btn btn-default add-font 3">Insert Text</div>
			</div>
		</div>

		<div id="f4" class="hide col-md-12 font_form_wrapper">
			<div class="col-md-3 form_group">
				<input id="font-4" class="front fonts form-control" />
			</div>
			<div class="col-md-3">
				<?php echo include("font_options.php"); ?>
			</div>
			<div class="col-md-6">
				<div id="frot4" class="btn frrd rot "><i class="fa fa-repeat"></i></div>
				<div id="fres4" class="btn frrd res "><i class="fa fa-arrows-alt"></i></div>
				<div id="fdor4" class="btn frrd dor "><i class="fa fa-adjust"></i></div>
				<div id="fdel4" class="btn del"><i class="fa fa-trash-o"></i></div>
				<div class="btn btn-default add-font 4">Insert Text</div>
			</div>
		</div>

		<div id="f5" class="hide col-md-12 font_form_wrapper">
			<div class="col-md-3 form_group">
				<input id="font-5" class="front fonts form-control" />
			</div>
			<div class="col-md-3">
				<?php include("font_options.html.erb"); ?>
			</div>
			<div class="col-md-6">
				<div id="frot5" class="btn frrd rot "><i class="fa fa-repeat"></i></div>
				<div id="fres5" class="btn frrd res "><i class="fa fa-arrows-alt"></i></div>
				<div id="fdor5" class="btn frrd dor "><i class="fa fa-adjust"></i></div>
				<div id="fdel5" class="btn del"><i class="fa fa-trash-o"></i></div>
				<div class="btn btn-default add-font 5">Insert Text</div>
			</div>
		</div>

		<div class="col-md-12">
			<div id="add_text_field" class="btn"><i class="fa fa-plus"></i></div>
		</div>
	</div>
</div>
	


<!-- color -->
<div id="colorBlash-ctl" class="color-content palet-content draggable hide front rounded_corner draggable">
	<i class="fa fa-times-circle-o close-window"></i>
	<div class="picker"></div>
</div>

<!-- zooming bar -->
<div id="zoom-ctl" class="zoom-content palet-content draggable hide front rounded_corner draggable">
	<div class="row">
		<div class="col-md-12">
			<i class="fa fa-times-circle-o close-window right"></i>
			<h1>Zoom</h1>
		</div>
		<div class="col-md-12">
			<!-- <input id="zoomSlider" type="text"  style="width:100%"/> -->
		</div>
	</div><!-- end of row -->
</div>



<!-- bottom button -->
<div id="tools_wrapper" class="continer fixed z8">

</div>
<div id="controller_wapper" class="container fixed z7">
	<div class='row'>
	<!-- Change Side -->
	<div id="changeSide" class="changeSide col-md-offset-1 col-md-1 center-text cursor back">
		<i class="fa fa-exchange"></i>
		<p class="center-text">Bottom Side</p>
	</div>
  <!-- Style -->
  <div id="style" class="col-md-1 center-text cursor paletIcons front">
  	<i class="fa fa-plus"></i>
  	<p class="center-text">Style</p>
  </div>
	<!-- Size of board -->
	<div id="size" class="col-md-1 center-text cursor paletIcons front">
		<i class="fa fa-expand"></i>
		<p class="center-text">Size</p>
	</div>
	<!-- Image uploader -->
	<div id="images" class="col-md-1 center-text cursor paletIcons front">
		<i class="fa fa-picture-o"></i>
		<p class="center-text">Picture</p>
	</div>
	<!-- Font -->
	<div id="font" class="col-md-1 center-text cursor paletIcons front">
		<i class="fa fa-font"></i>
		<p class="center-text">Font</p>
	</div>
	<!-- color blush -->
	<div id="colorBlash" class="col-md-1 center-text cursor paletIcons front">
		<i class="fa fa-paint-brush"></i>
		<p class="center-text">Color</p>
	</div>
	<!-- zoom in -->
	<div id="zoom" class="col-md-1 center-text cursor paletIcons front">
		<i class="fa fa-search"></i>
		<p class="center-text">Zoom</p>
	</div>
	<!-- zoom reset -->
	<!--
	<div id="zoomOrigin" class="col-md-1 center-text cursor paletIcons front">
		<i class="fa fa-arrows-alt"></i>
		<p class="center-text">Full Size</p>
	</div>
	-->
	<!-- zoom out -->
	<!--
	<div id="zoomOut" class="col-md-1 center-text cursor paletIcons front">
		<i class="fa fa-search-minus"></i>
		<p class="center-text">Zoom Out</p>
	</div>
	-->
	<!-- save -->
	<div id="save" class=" col-md-1 center-text cursor paletIcons front">
		<i class="fa fa-floppy-o"></i>
		<p class="center-text">Save</p>
	</div>
	<!-- start over -->
	<div id="startover" class=" col-md-1 center-text cursor paletIcons front">
		<i class="fa fa-undo"></i>
		<p class="center-text">Start Over</p>
	</div>
 </div>
</div>
