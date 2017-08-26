#!/bin/bash
# Traitement avec bash du Web Coverage Service (WCS) de MF
# On exécute successivement :
#   - getCapabilities pour connaitre tous les coveragesID proposés
#   - pour chacun des coveragesID vieux de moins d'un jour, un describeCoverage pour connaître tous 
#     les url possibles (heure prévision, niveaux)
#   - pour chaque url , un getCoverage pour une zone géographique réduite
#     que l'on passe à traiteGeotiff.js pour en extraire les données. 
#
date  # affichage de la date du début des traitements
resol=$1  ## le premier paramètre d'appel du script est la résolution du modèle Arome : 001 ou 0025
path="https://geoservices.meteofrance.fr/services/MF-NWP-HIGHRES-AROME-"
path=$path$resol"-FRANCE-WCS?request=GetCapabilities&version=1.3.0&service=WCS&token=__BvvAzSbJXLEdUJ--rRU0E1F8qi6cSxDp5x5AtPfCcuU__"
#curl "https://geoservices.meteofrance.fr/services/MF-NWP-HIGHRES-AROME-001-FRANCE-WCS?request=GetCapabilities&version=1.3.0&service=WCS&token=__BvvAzSbJXLEdUJ--rRU0E1F8qi6cSxDp5x5AtPfCcuU__" > resultGetCapabilities
echo $path  # path pour la requette getCapabilities au service WCS
curl $path > resultGetCapabilities   # requête getCapabilities au service WCS
grep "<wcs:CoverageId>" resultGetCapabilities > toto   
sed  "s/<wcs:CoverageId>/""/g" toto > tata
sed  "s/<\/wcs:CoverageId>/""/g" tata > titi
sed  "s/^[ \t]*//g" titi > WCScapabilities   # la liste des coverageID a été fabriquée
rm toto tata titi
head -n 3100 WCScapabilities | tail -n 1 | while read line  # boucle sur les n premières lignes du fichier contenat les coveragesID
do
./getCoverage.sh $line $resol ## download du coverage par une requête getCoverage au WCS
done
cat WCScapabilities | wc -l
date




