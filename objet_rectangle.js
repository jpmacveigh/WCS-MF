// Déclare une fonction constructeur
function Rectangle(largeur, hauteur) {
  this.largeur = largeur; // sauve la largeur dans l'instance
  this.hauteur = hauteur; // sauve la hauteur dans l'instance
  Rectangle.prototype.surface = function() {
    return this.largeur * this.hauteur;
  };
  Rectangle.prototype.perimetre=function(){
    return (this.largeur+this.hauteur)*2;
  };
  Rectangle.prototype.h=this.hauteur;
}

var r1 = new Rectangle(10, 4); // crée un instance
console.log (r1.surface());
var r2 = new Rectangle(12, 18); // crée une autre instance
console.log(r2.hauteur);
console.log(r2.perimetre());
console.log(r2.h);