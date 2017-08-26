function getAromeWCSGetCoverage(path){  // Envoit et traite le résultat d'une requette "getCoverage" au service Web Coverge Servicee (WCS)
	var url =path;
	$.ajax({  // requette "getCoverage" au service Web Coverge Servicee (WCS)
		type: "GET",
		url: url,
		//dataType: "tiff",
		success: parseGetCoverage,
		error: function(){
			console.log("erreur lecture GetCoverage");
			}	
	});
	function parseGetCoverage(tiff){
		console.log("activation de parseGetCoverage");
		console.log ("longueur du tiff reçu : ",tiff.length);
		console.log(tiff);
		console.log("On passe la main à traiteGeotiff");
		traiteGeotiff(tiff);
		
	}
}