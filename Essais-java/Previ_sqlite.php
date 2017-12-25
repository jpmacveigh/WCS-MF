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
       width:  500px;
       height: 500px;
       margin: auto;
    }
  </style>
  <title>Prévisions</title>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
  <script src="https://cdn.anychart.com/releases/8.1.0/js/anychart-base.min.js" type="text/javascript"></script>
  <script src='plot_points.js' type="text/javascript"></script>
</head>
<body>
  <a name="haut"/>
	<p><a href="#bas">bas de la page</a></p>
  <?php
    exec('cat resultPrevi | wc -l',$nblignes);
    echo '<h1>le fichier resultPrevi contient '.$nblignes[0].' lignes</h1>';
    include("MyDB.php");
    include("AfficheTableauAssociatif.php");
    echo "<h2>Traitements SQLITE</h2>";
    date_default_timezone_set('UTC');
    echo 'Version PHP courante : ' . phpversion()."<br>".date("r")."<br>";
    $db = new MyDB('Arome.sqlite');
    $result= $db->query('SELECT count(*) FROM prevision');
    $taillePrevision=$result->fetchArray()[0];
    echo '<h1>la table "prevision" de la base "Arome.sqlite" contient '.$taillePrevision.' lignes</h1>';
    $rows=$db->selectArray("select now,nom,val from prevision");
    $i=0;
    echo "Première: ".$rows[$i]["now"]." ".$rows[$i]["nom"]." ".$rows[$i]["val"]."<br>";
    $i=sizeof($rows)-1;
    echo "Dernière: ".$rows[$i]["now"]." ".$rows[$i]["nom"]." ".$rows[$i]["val"]."<br>";
    $rows=$db->selectArray("select nom,niv,count(*),min(date),max(date)  from prevision group by nom,niv order by nom");
    AfficheTableauAssociatif("Liste des noms des variable et de leurs niveaux",$rows);
    for ($i=0;$i<sizeof($rows);$i++){// boucle sur les variables et leurs niveaux
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
        echo'{x:'.$j.',value:'.$series[$j]["val"].'},';
      }
      echo ']</script>';
      echo '<script>
        plot_points(data,"courbe'.$i.'","'.$rows[$i]["nom"].' '.$rows[$i]["niv"].'");
      </script><br>';
    }
  
    // lecture de la première ligne du fichier des prévisions
      $fichier = fopen('resultPrevi','r');
      echo $nombre_ligne_fichier;
      $ligne = fgets($fichier);
      fclose($fichier);
      $previ=json_decode($ligne,true);
  ?>
  <div id=nombreLignes></div>
  <div class="container">
    <h2>Prévisions</h2>
    <table class="table table-condensed">
      <thead>
        <tr>
         <th>n</th>    
         <?php
         foreach ($previ as $cle => $valeur){  // ecriture des entêtes des colonnes
          echo "<th>".$cle."</th>";
         }
         ?>
        </tr>
      </thead>
      <tbody id="corps_tableau">
        <?php
          $fichier = fopen('resultPrevi','r');
          $n=0;
          while (($ligne = fgets($fichier))!==false){
            $n=$n+1;
            $previ=json_decode($ligne,true);
            echo "<tr>";
              echo "<td>".$n."</td>";     // le numéro de la prévision dans la première 
              foreach ($previ as $cle => $valeur){  // écriture du contenu de chaque colonne
                echo "<td>".$valeur."</td>";
              }
            echo "</tr>";
          }
          fclose($fichier);
        ?>
      </tbody>
    </table>
  </div>
  <a name="bas"/>
	<p><a href="#haut">haut de la page</a></p>
</body>
</html>
