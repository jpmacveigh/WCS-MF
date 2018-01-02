<!DOCTYPE html>
<html lang="en">
<head>
  <style>
    #corps_tableau { 
      font-size: 0.7em;
    }
    html, body {
        width: 100%;
        height: 100%;
        margin:  0;
        padding: 0;
    }
    .trace_courbe {
       width:  85%;
       height: 500px;
       margin: auto;
    }
  </style>
  <title>Série temporelle</title>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
  <script src="https://cdn.anychart.com/releases/8.1.0/js/anychart-base.min.js" type="text/javascript"></script>
</head>
<body>
  <script src="plot_points_previ.js" type="text/javascript"></script>
<?php
include("MyDB.php");
include("AfficheTableauAssociatif.php");
include("chaineDateAromeToTimestamp.php");
function dessine_serie_2($i){
      $rows=$_SESSION ['rows'];
      $db = new MyDB('Arome.sqlite');
      $qstr ='select nom,now,run,date,val from prevision where nom="'.$rows[$i]["nom"].'" and niv="'.$rows[$i]["niv"].'" order by date';
      echo $qstr; 
      $series=$db->selectArray($qstr);  // extraction de la série temporelle
      AfficheTableauAssociatif('Serie temporelle de : '.$rows[$i]["nom"].' '.$rows[$i]["niv"],$series);
      echo '<div id="courbe'.$i.'" class="trace_courbe">';  // emplacement où l'on va tracer 
      echo 'ici sera la courbe N°: '.$i.'</div>';
      echo '<script> 
        var x='.$i.';
        console.log("x: ",x);</script>';
      echo '<script>
        var data=[';
      for ($j=0;$j<sizeof($series);$j++){
        //echo'{x:'.$j.',value:'.$series[$j]["val"].'},';
        echo'{x:'.chaineDateAromeToTimestamp($series[$j]["date"]).',value:'.$series[$j]["val"].'},';
      }
      echo ']</script>';
      echo '<script>
        var transformxAxisLabel= function (ts){
          return new Date(ts*1000).toISOString();
        };
        plot_points_previ(data,"courbe'.$i.'","'.$rows[$i]["nom"].' '.$rows[$i]["niv"].'",transformxAxisLabel);
      </script><br>';
}
?>
</body>
</html>