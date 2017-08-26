function MFModeleWebCoverageService(nomModel){
	this.lesCoverageIds=getAromeWCSCapabilities(nomModel)  	     // Ex�cution de la requ�te GetCapabilities du WCS (Web Coverage Service) qui renvoie la liste des coverages accessibles par la requ�te GetCoverage du WCS
	this.nbCoverages=Object.keys(this.lesCoverageIds).length;    // nombre de coverages propos�s par le WCS via les requete "describeCoverage" puis "getCoverage"
	this.nomModel=nomModel;
}