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
var MFModeleWebCoverageService=require("MFModeleWebCoverageService").MFModeleWebCoverageService;
var getAromeWCSDescribeCoverage=require("getAromeWCSDescribeCoverage").getAromeWCSDescribeCoverage;
var getLesPathsArome=require("getLesPathsArome").getLesPathsArome;
var getAromeWCSGetCoverage=require("getAromeWCSGetCoverage").getAromeWCSGetCoverage;

var traiteGeotiff=require("traiteGeotiff").traiteGeotiff;
//var $ = require('jquery');
var wcs= new MFModeleWebCoverageService(nomModele);  // initilalisation du Web Coverage Service MF sur le mod�le
for (var n=0;n<wcs.lesCoverageIds.length;n++){       // affichage de tous les coverageIds propos�s par le WCS de MF
	//$("#coverages").append(n+1+" id = "+wcs.lesCoverageIds[n]+"<br>");
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
//$("#coverages").append("<br>getCoveragePath : " +coveragePath+"<br>");  // affichage du path
var tiff = getAromeWCSGetCoverage(coveragePath);    // lecture du coverage
//$("#getcoverage").text(tiff);
traiteGeotiff (tiff);