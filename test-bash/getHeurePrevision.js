function getHeurePrevision(heureDuRun,echeance){
/* 	Entrée 		: heureDuRun sous la forme : "AAAA-MM-JJTHH:MN:SSZ"
				: echeance en secondes entières
	Retourne	: heurePrevision sous la forme : "AAAA-MM-JJTHH:MN:SSZ"
*/
	var run=new Date(heureDuRun);
	var miliRun=run.getTime();
	var miliPrevi=miliRun+echeance*1000;
	var heurePrevi=new Date(miliPrevi).toISOString().replace(/\..../,"");
	return heurePrevi;
}