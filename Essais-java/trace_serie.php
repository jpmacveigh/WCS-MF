<?php
    session_start();
    include("dessine_serie_2.php");
    echo "la serie a tracer est la numero: ".$_POST["valider"]."<br>";
    $i=$_POST["valider"];
    dessine_serie_2($i);
?>