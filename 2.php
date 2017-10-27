<?php

include ('connect_db.php');

$idDisease= $_POST['idDisease'];
$idClient= $_POST['idClient'];


?>



<div class="form-group">
    <label for="facturas" class="col-lg-2 control-label">Facturas</label>
    <div class="col-lg-10">

   
    <select name="sell_id" class="form-control">
    <option value="">-- NINGUNO --</option>
    <?php
$find= mysqli_query($link,"SELECT * from sell WHERE person_id=$idClient and idDisease= $idDisease");
while ($row = mysqli_fetch_array($find)) 
	{?>
      <option value="<?php echo $row['id'];?>"><?php echo $row['id2'];?></option>
    <?php } ?>
      </select>
    </div>
  </div>


