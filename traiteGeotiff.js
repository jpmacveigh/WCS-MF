function traiteGeotiff (path){
    /*
    var fs = require("fs");
    fs.readFile(path, function(err,geotiff) {
    if (err) throw err;
    console.log("lecture OK geotiff de Météo-France : ", path);
    */
    var geotiff=path;
    console.log(path);
    //var dataArray = geotiff.buffer.slice();
    //var dataArray = geotiff.buffer.slice();
    var dataArray = geotiff;
    //console.log("slice OK");
    //var GeoTIFF = require("geotiff");
    console.log("dataArray : "+dataArray);
    this.tiff = GeoTIFF.parse(dataArray);
    //console.log("parse OK");
    //console.log(tiff);
    //console.log(tiff.geotifView);
    console.log ("nombre images dans le tiff : ",this.tiff.getImageCount()); 
    this.image = this.tiff.getImage(); // or use .getImage(n) where n is between 0 and tiff.getImageCount() 
    console.log("largeur : ",this.image.getWidth(), "   hauteur : ",this.image.getHeight(), "   pas : ",this.image.getSamplesPerPixel());
    //console.log("************************* getFileDirectory *********************************");
    //console.log(this.image.getFileDirectory());
    //console.log("************************* fin de getFileDirectory **************************");
    var gdalMetadata = this.image.getFileDirectory().GDAL_METADATA;
    //console.log("GDAL_METADATA : ",gdalMetadata);
    var DOMParser = require('xmldom').DOMParser;
    var parser = new DOMParser();
    var xmlDoc = parser.parseFromString(gdalMetadata,"text/xml");
    var variable=xmlDoc.getElementsByTagName("Item")[0].childNodes[0].nodeValue;
    console.log("variable : ",variable);
    console.log("échéance (sec) : ",xmlDoc.getElementsByTagName("Item")[2].childNodes[0].nodeValue);
    var dateDuRun=xmlDoc.getElementsByTagName("Item")[3].childNodes[0].nodeValue;
    console.log("date du run : ",dateDuRun);
    var timeInMili =parseInt(xmlDoc.getElementsByTagName("Item")[3].childNodes[0].nodeValue.substring(0,10),10)*1000;
    //console.log (timeInMili);
    console.log("date du run : ",new Date(timeInMili));
    var datePrevision=xmlDoc.getElementsByTagName("Item")[6].childNodes[0].nodeValue;
    console.log("date prévision : ",datePrevision);
    timeInMili =parseInt(xmlDoc.getElementsByTagName("Item")[6].childNodes[0].nodeValue.substring(0,10),10)*1000;
    //console.log (timeInMili);
    console.log("date prévision : ",new Date(timeInMili));
    var description=xmlDoc.getElementsByTagName("Item")[7].childNodes[0].nodeValue;
    console.log("description : ",description);
   
    console.log("ModelTiepoint : ",this.image.getFileDirectory().ModelTiepoint);
    console.log("ModelTiepoint[4] : ",this.image.getFileDirectory().ModelTiepoint[4]);
    //console.log("************************** getGeoKey ***************************************");
    //console.log(this.image.getGeoKeys());
    //console.log("************************** fin de getGeoKey ********************************");
    var rasters = this.image.readRasters();
    if (rasters[0].length == (this.image.getWidth()*this.image.getHeight())){
      console.log ("longueur du raster : ",rasters[0].length,"  OK");
    }
    //console.log("première valeur du raster rasters[0][0]: ",rasters[0][0]);
    //console.log("dernière valeur du raster rasters[0][rasters[0].length-1] : ",rasters[0][rasters[0].length-1]);
    console.log("premier point : ",getPoint(0,0));
    console.log("dernier point : ",getPoint(this.image.getWidth()-1,this.image.getHeight()-1));
    var valeurPrevue=getPoint(6,36)["val"];
    console.log("point défini  : ",getPoint(6,36));  // point Lille (3.06,50.64) dans vigentte 0.01 degrès couvrant Longi(3,4) et Lati(50.51)
    //Affiche(image);
    var chaine=variable+" "+description+" "+dateDuRun+" "+datePrevision+" "+valeurPrevue;
    console.log (chaine);
    function getLongiLati(i,j){
      isValide(i,j);
      var longimin=this.image.getFileDirectory().ModelTiepoint[3];         // longitude minimale (bord Ouest)
      var latimax=this.image.getFileDirectory().ModelTiepoint[4];          // latitude maximale  (bord Nord)
      //console.log ("longimin : ",longimin,"   latimax : ",latimax);
      var deltalongi=this.image.getFileDirectory().ModelPixelScale[0];     // incrément de longitude
      var deltalati=this.image.getFileDirectory().ModelPixelScale[1];      // décrément de latitude
      //console.log ("deltalongi : ",deltalongi,"   deltalati : ",deltalati);
      var longi=longimin+i*deltalongi;
      var lati=latimax-j*deltalati;
      return {longi,lati};
    }
    function getValue(i,j){
      isValide(i,j);
      var nblongi=this.image.getWidth();           // nb de pixels sur la largeur (longitudes)
      //var nblati=image.getHeight();           // nb de pixels sur la hauteur (latitudes)
      var rasters = this.image.readRasters();
      return (rasters[0][j*nblongi + i]);     // le raster est supposé être une suite de "nblati" lignes de longitudes de "nblongi" de largeur
    }
    function getPoint(i,j){
      var val = getValue(i,j);
      var longi = getLongiLati(i,j)["longi"];
      var lati = getLongiLati(i,j)["lati"];
      return {longi,lati,val};
    }
    function Affiche (){
      for (var i=0;i<this.image.getWidth();i++){
        for (var j=0;j<this.image.getHeight();j++){
          console.log(i,j,getPoint(i,j));
        }
      }
    }
    function isValide (i,j){
      var rep = ((i>=0)&&(i<this.image.getWidth())&&(j>=0)&&(j<this.image.getHeight()));
      if (rep) {
        return;
      }
      else { 
        console.log("(",i,",",j,") non valide");
        throw new Error("(",i,",",j,") non valide");
      }
    }
  
}
