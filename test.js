var f1 = function(e) {
    console.log("Première fonction...");
    e("test");
};
var f2 = function(e) {
    console.log("Résultat : " +e);
}
f1(f2);
// Sortie :
// Première fonction...
// Résultat : test
console.log ("test de jpmv");
require("toto").bonjour();
require("toto").ecrit("tu es bien dans toto");
console.log(require("toto").renvoi("Banyuls sur Mer"));
require("toto").bye();
var nom="Arome0010"
require("getAromeWCSCapabilities").getAromeWCSCapabilities(nom,function(lesCoveragesID){
    console.log("nombre de coverageID après callback : "+lesCoveragesID.length);
    console.log("premier coverageID : "+lesCoveragesID[0]);
    console.log("dernier coverageID : "+lesCoveragesID[lesCoveragesID.length-1]);
    var rangCoverage=Math.floor((Math.random() * lesCoveragesID.length));  // rang du coverageId que l'on va acqu�rir et d�coder par describeCoverage
    console.log ("rang du coverageID analyse : ",rangCoverage);
});

