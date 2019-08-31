function Complexe(re,im) {
  this.re=re;
  this.im=im;
  this.module=Math.sqrt(re*re+im*im);
  this.arg=Math.atan(im/re)*180./Math.PI;  // agument en degrés
  Complexe.prototype.somme=function(a){
      return new Complexe(re+a.re,im+a.im);
  };
  Complexe.prototype.produit=function(a){
      return new Complexe(re*a.re-im*a.im,re*a.im+im*a.re);
  };
}
var x=new Complexe (20.,-2.);
console.log(x);
console.log (x.somme(new Complexe(23,45)));
console.log (x.produit(new Complexe(23,45)));

