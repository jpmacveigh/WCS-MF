/*var exports="";
exports.getAromeWCSCapabilities=getAromeWCSCapabilities; 
var getNomModeleMF=require("getNomModeleMF").getNomModeleMF;
//var $ = require('jquery');
var $ = require('najax');
var getCle=require("getCle").getCle;*/
function getAromeWCSCapabilities(nomModele){ // Envoit et traite le résultat d'une requête "getCapabilities" au service Web Coverage Service (WCS)
	var model=getNomModeleMF(nomModele);
	var service="WCS";
	var lesCoverageIds=[];
	var cle_jpmv=getCle();
	var url="https://geoservices.meteofrance.fr/services/"+model+service+"?request=GetCapabilities&version=1.3.0&service="+service+"&token="+cle_jpmv;		
	console.log("url pour getWCSCapabilities : ",url);
	$.ajax({   // requête "getCapabilities" au service Web Coverage Service (WCS) 
			type: "GET",
			url: url,
			async:false,
			dataType: "xml",
			succes: parseWCSCapabilities,
			error: function(){
				console.log("erreur lecture Ajax");
			}
	});
	function parseWCSCapabilities(xml){  // construit la liste des coverageId qui seront nécessaires pour les requêtes "describeCorverage" et "getCoverage"
		var $ = require("jquery");
		console.log("parseWCS");
		console.log(xml);
		//$("#capaWCS").html(xml);
		$(xml).find("wcs\\:Capabilities wcs\\:Contents wcs\\:CoverageSummary,CoverageSummary").each(function(){
				var id=$(this).find("wcs\\:CoverageId,CoverageId").text();
				lesCoverageIds.push(id);	
		});
	}
	return lesCoverageIds  // on retourne la liste des coverageId
}