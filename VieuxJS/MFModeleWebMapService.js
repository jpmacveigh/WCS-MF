function MFModeleWebMapService(nomModel){
	this.lesCouches=getAromeWMSCapabilities(nomModel);  		// Ex�cution de la requ�te GetCapabilities du WMS (Web Map Service) qui renvoie la liste des cartes accessibles par la requ�te GetMap du WMS
	this.nbCouches=Object.keys(this.lesCouches).length;
	this.lesNomsDesCouches=Object.keys(this.lesCouches);
	this.nomModel=nomModel;
}