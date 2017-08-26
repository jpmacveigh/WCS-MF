var nomModele="Arome0025";
var wcs;
require("getAromeWCSCapabilities").getAromeWCSCapabilities(nomModele,function(data){
    wcs=data;});  // initilalisation du Web Coverage Service MF sur le mod�le
process.exit();
console.log ("Nb de describeCoverage : ",wcs.length);
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

// pr�paration d'une requette getCoverage au WCS
var limitesGeo = new google.maps.LatLngBounds(new google.maps.LatLng(45,1),new google.maps.LatLng(45.3,1.3));  // limites geo du getCoverage (SW,NE)
var time="";
var elevation="";
var coveragePath=getMFWCSPath(wcs,wcs.lesCoverageIds[rangCoverage],limitesGeo,time,elevation);  // calcul de son path