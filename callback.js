/*
Une fonction de retour (callback) est une fonction comme les autres.
Sa particularité est qu'elle est appelée par une autre qui l'a reçu en tant que paramètre.
*/
function test(fct_retour) {
  fct_retour(); // appel de la fonction
}
function retour1() {
  console.log('Retour 1');
}
function retour2() {
  console.log('Retour 2');
}
test(retour1); // affiche 'Retour 1'
test(retour2); // affiche 'Retour 2'
test(function(){
    console.log("callback passée sous la forme d'une fonction annonyme");
});