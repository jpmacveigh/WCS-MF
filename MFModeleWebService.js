function MFModeleWebService(nomModel){
	this.lesCouches=getAromeWMSCapabilities(nomModel);  		// Ex�cution de la requ�te GetCapabilities du WMS (Web Map Service) 
	this.lesCoverageIds=getAromeWCSCapabilities(nomModel)  	// Ex�cution de la requ�te GetCapabilities du WCS (Web Coverage Service)
	this.getLesCouches=getLesCouches;							// Renvoie la liste des cartes accessibles par la requ�te GetMap du WMS
	this.getLesCoverageIds=getLesCoverageIds;				// Renvoie la liste des coverages accessibles par le requ�te GetCoverage du WCS
	this.nbCouches=Object.keys(this.lesCouches).length;
	this.lesNomsDesCouches=Object.keys(this.lesCouches);
	function getLesCouches(){
		return this.lesCouches;
	}
	function getLesCoverageIds(){
		return this.lesCoverageIds;
	}
	function getNomModel(){
		return this.nomModel;
	}
}