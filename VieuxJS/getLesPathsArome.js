exports.getLesPathsArome=getLesPathsArome;
var getNomModeleMF=require("getNomModeleMF").getNomModeleMF;
function getLesPathsArome(describedCoverage,latNord,latSud,longOuest,longEst){ // retourne la liste tous les path possible pour le coverageID donné sur pour une zone géographique donnée
	var lesPaths=[];
	var lesPathsEcheance=[];
	var modele=getNomModeleMF(describedCoverage["nomModele"]);
	for (var i=0;i<describedCoverage["Axes"]["time"]["Axiscoefficients"].length;i++){  //boucle sur les échéances disponibles
		var echeance=describedCoverage["Axes"]["time"]["Axiscoefficients"][i];
		console.log ("échéance: ",echeance);
		var heurePrevi=getHeurePrevision(describedCoverage["referenceTime"],echeance);
		console.log("heurePrevi : ",heurePrevi);
		var path="https://geoservices.meteofrance.fr/api/__BvvAzSbJXLEdUJ--rRU0E1F8qi6cSxDp5x5AtPfCcuU__/"; // fabrication du path pour la requête getCoverage au WCS
		path=path+modele+"WCS?SERVICE=WCS&VERSION=2.0.1&REQUEST=GetCoverage&format=image/tiff&coverageId=";
		path=path+describedCoverage["coverageId"];
		path=path+"&subset=time("+heurePrevi+")";
		path=path+"&subset=lat("+latSud+","+latNord+")&subset=long("+longOuest+","+longEst+")";
		lesPathsEcheance.push(path);
	}
	console.log("lesPathsEcheance : ",lesPathsEcheance);
	if (typeof describedCoverage["Axes"]["height"] !== 'undefined') var niveau="height";       // le coverageId possède-t-il des niveaux "height"
	if (typeof describedCoverage["Axes"]["pressure"] !== 'undefined') var niveau="pressure";   // le coverageId possède-t-il des niveaux "pressure"
	if (typeof niveau !== 'undefined') {  // éventuelle boucle sur les hauteurs ou les pression si le paramètres du modèle le requiert
		var nbNiv = describedCoverage["Axes"][niveau]["Axiscoefficients"].length;
		console.log("possède des niveaux : ",nbNiv);
		var lesPathsComplets=[];
		for (var j=0;j<lesPathsEcheance.length;j++){   // on rajoute à chaque échéance tous les niveaux possible
			var path=lesPathsEcheance[j];
			for (var i=0;i<describedCoverage["Axes"][niveau]["Axiscoefficients"].length;i++){
				var pathComplet=path+"&subset="+niveau+"("+describedCoverage["Axes"][niveau]["Axiscoefficients"][i]+")";
				lesPathsComplets.push(pathComplet);
			}	
		}
		lesPaths=lesPathsComplets.slice();	
	} 
	else {
		console.log("ne possède pas de niveaux");
		lesPaths=lesPathsEcheance.slice();
	}
	console.log("lesPaths : ",lesPaths);
	return lesPaths;
}
function getHeurePrevision(heureDuRun,echeance){
/* 	Entrée 		: heureDuRun sous la forme : "AAAA-MM-JJTHH:MN:SSZ"
				: echeance -*en secondes entières
	Retourne	: heurePrevision sous la forme : "AAAA-MM-JJTHH:MN:SSZ"
*/
	var run=new Date(heureDuRun);
	var miliRun=run.getTime();
	var miliPrevi=miliRun+echeance*1000;
	var heurePrevi=new Date(miliPrevi).toISOString().replace(/\..../,"");
	return heurePrevi;
}