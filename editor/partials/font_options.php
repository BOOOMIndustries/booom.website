<!-- -font style -->
<?php
$fontFamilies = array(
			"font-Georgia","font-Palatino_Linotype","font-Arial","font-Times_New_Roman_Arial","font-Arial_Black","font-Comic_Sans_MS",
			"font-Impact","font-Lucida_Sans","font-Tahoma","font-Trebuchet_MS","font-Verdana","font-Courier_New","font-Lucida_Console"
			);
		$fnames = array(
			"Georgia","Palatino Linotype","Arial","Times New Roman Arial","Arial Black","Comic Sans MS",
			"Impact","Lucida Sans","Tahoma","Trebuchet MS","Verdana","Courier New","Lucida Console"
			);
		$ffamIDs = array(
			"ffam1","ffam2","ffam3","ffam4","ffam5","ffam6","ffam7","ffam8","ffam9","ffam10"
			);

?>

<div class="form-group">	
		<select class="form-control font_size_ctl ffam" id="ffam-1">
				<?php for($i=0; $i < sizeof($fnames);$i++){ ?>
				<option class="<?= $fontFamilies[$i]; ?>" value="<?= $fnames[$i]; ?>"><?= $fnames[$i]; ?></option>
				<?php } ?>
		</select>
</div>
