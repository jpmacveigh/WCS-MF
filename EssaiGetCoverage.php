<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
    <style>
		html, body {
			height: 100%;
			margin: 0;
			padding: 0;
			}
	</style>
    <title>Lecture describeCoverage et getCoverage </title>
  </head>
  <body>
	<h1 align="center">Lecture et traitement describeCoverage et getCoverage pour Arome 0.01 et 0.025 (WCS)</h1>
	<div id="coverages"></div>
	<hr>
	<div id="describecoverage"></div>
	<hr>
	<div id="getcoverage"></div>
	<hr>
    <script src="getAromeWCSCapabilities.js"></script>
	<script src="MFModeleWebCoverageService.js"></script>
	<script src="getAromeWCSDescribeCoverage.js"></script>
	<script src="getCle.js"></script>
	<script src="getNomModeleMF.js"></script>
	<script src="getMFWCSPath.js"></script>
	<script src="getLesPathsArome.js"></script>
	<script src="getAromeWCSGetCoverage.js"></script>
	<script src="traiteGeotiff.js"></script>
	<script	src="https://maps.google.com/maps/api/js?libraries=geometry&key=AIzaSyAIAo83oq6ZUmZKb59B1Z-LlZiYiLUhBC4" ></script>
	<script src="/node_modules/geotiff/dist/geotiff.browserify.js"></script>
	<script>
		var nomModele="Arome0025";
		/*
		var wms= new MFModeleWebMapService(nomModele);  // initilalisation du Web Map Service MF sur le mod�le
		console.log("nb de couches : "+wms.nbCouches);
		var nb=0;
		for (var nom in wms.lesCouches) {
			nb++;
			console.log (nb+" nom de la couche : "+ nom);
			for (var dimension in wms.lesCouches[nom]){
				console.log ("    "+dimension+" longueur : "+wms.lesCouches[nom][dimension].length);
				console.log ("    valeurs : "+wms.lesCouches[nom][dimension]);
			}
		}
		*/
		var wcs= new MFModeleWebCoverageService(nomModele);  // initilalisation du Web Coverage Service MF sur le mod�le
		for (var n=0;n<wcs.lesCoverageIds.length;n++){       // affichage de tous les coverageIds propos�s par le WCS de MF
			$("#coverages").append(n+1+" id = "+wcs.lesCoverageIds[n]+"<br>");
		}
		console.log ("Nb de describeCoverage : ",wcs.lesCoverageIds.length);
		var rangCoverage=Math.floor((Math.random() * wcs.lesCoverageIds.length));  // rang du coverageId que l'on va acqu�rir et d�coder par describeCoverage
		console.log ("rang du decribeCoverage analyse : ",rangCoverage);
		var describedCoverage = getAromeWCSDescribeCoverage(nomModele,wcs.lesCoverageIds[rangCoverage]);   // describtion du coverage choisi par envoi d'une requete "describeCoverage" au WCS
		console.log ("describedCoverage : ",describedCoverage);
		var listDesPathDisponibles=getLesPathsArome(describedCoverage,51,50,2,3);
		console.log("nb de path disponible pour une requete getCoverage : ",listDesPathDisponibles.length);		
		var rangCoveragePaths= Math.floor((Math.random() * listDesPathDisponibles.length));  // rang du path que l'on va acqu�rir et d�coder
		var coveragePath=listDesPathDisponibles[rangCoveragePaths];  
		console.log ("rang du path acquis par getCoverage : ",rangCoveragePaths);
		console.log(coveragePath);
		$("#coverages").append("<br>getCoveragePath : " +coveragePath+"<br>");  // affichage du path
		var tiff = getAromeWCSGetCoverage(coveragePath);    // lecture du coverage
		$("#getcoverage").text(tiff);
		
		

		
		
		/*
		// pr�paration d'une requette getCoverage au WCS
		var limitesGeo = new google.maps.LatLngBounds(new google.maps.LatLng(45,1),new google.maps.LatLng(45.3,1.3));  // limites geo du getCoverage (SW,NE)
		var time="";
		var elevation="";
		var coveragePath=getMFWCSPath(wcs,wcs.lesCoverageIds[rangCoverage],limitesGeo,time,elevation);  // calcul de son path
		*/
    </script>
    <?php
			$str = "Hello world!";
			echo $str;
			$fichier = fopen("tifflocal", "w"); 
    		$lehtml="tiff  ".date(DATE_RFC2822);
        	fputs($fichier, $lehtml);
			fclose ($fichier);
    ?>
  </body>
</html>