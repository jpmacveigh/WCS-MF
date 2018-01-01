<?php
    function AfficheTableauAssociatifAvecAncre ($titre,$tab){
        echo '<div class="container">';
        echo '<h2>'.$titre.'</h2>
            <table class="table table-condensed">
              <thead>
                <tr>';
                 foreach ($tab[0] as $cle => $valeur){  // ecriture des entêtes des colonnes
                  echo "<th>".$cle."</th>";
                 }
                echo"</tr>";
              echo'</thead>';
              echo '<tbody id="corps_tableau">';
              for ($i=0; $i<sizeof($tab);$i++){ 
                echo "<tr>";
                $label="";
                foreach ($tab[$i] as $cle => $valeur){  // écriture du contenu de chaque colonne
                    $label=$label.$tab[$i][$cle]."   ";
                }
                echo '<input type="hidden" name="atracer" value="'.var_dump($tab[$i]).'"/>';
                echo '<input type="submit" name="valider" value="'.$label.'"/>';
                echo "</tr>";
              }
              echo '</tbody>
            </table>
          </div>';
    }
?>