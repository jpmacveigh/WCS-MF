#!/bin/bash
# construit les paths et envoye les requêtes getCoverage au WCS   
#  $1 est le le coverageID
#  $2 est la résolution du modèle AROME (0025 ou 001)

resol=$2
echo "****************************************************************************************"
echo "getCoverage du coverageID  : "$1   # le coverageID est passé comme premier paramètre
. ./getDateCoverageID.sh    # chargement de la fonction qui extrait la date du Run contenu dans le nom du coverageID
heureCoverage=$(getDateCoverageID $1) # appel de ladite fonction
echo "heure avant traitement : "$heureCoverage
heure=${heureCoverage:0:19}   # on ne garde que 19 caractères à partir du début
echo "heure : "$heure
dateCoverageIDTimestamp=$(date -d, --date=$heure +%s)  # timeStamp de la date du coverageID
echo "dateCoverageIDTimestamp :"$dateCoverageIDTimestamp
nowTimestamp=$(date +%s) # timeStamp de la date actuelle
echo "nowTmestamp :"$nowTimestamp
ecart=$((($nowTimestamp-$dateCoverageIDTimestamp)/24/3600))  # ecart de temps en jour arrondi par défaut
echo "écart de temps : "$ecart" jour(s)" # ancienneté du coverageID du coverageID
if (($ecart >= 1)) # on ne traite pas les coverageID vieux de plus de 1 jour
    then
        echo "écart >=1 on ne traite pas le coverageID"
    else
        echo "écart <1 on le traite"
        echo "appel de getLesPaths"
        ./getLesPaths.sh $1 $resol # recherche des paths possibles pour un getCoverage.
        # Le résultat est dans le fichiers lesPaths
        path="https://geoservices.meteofrance.fr/api/__BvvAzSbJXLEdUJ--rRU0E1F8qi6cSxDp5x5AtPfCcuU__/MF-NWP-HIGHRES-AROME-"  # fabrication du path pour la requête getCoverage au WCS
        path=$path$resol"-FRANCE-WCS?SERVICE=WCS&VERSION=2.0.1&REQUEST=GetCoverage&format=image/tiff&coverageId="
        debutPath=$path$1"&subset=lat(50.0,51.0)&subset=long(3.0,4.0)"
        while read finPath  # boucle sur les paths calculés
        do
            echo " ****** fin du path : "$finPath
            path=$debutPath$finPath
            echo "path pour getCoverage : "$path
            curl $path > tifftempo # envoi de la requête getCoverage au service WCS
            node test-geotiff.js  # décodage et traitement du coverage reçu avec geotiff.js sous node 
        done < lesPaths
        
        #path=$path$1"&subset=lat(50.0,51.0)&subset=long(3.0,4.0)&subset=time("$heureCoverage")"
        #if echo $1 | grep GROUND_OR_WATER_SURFACE;  # recherche chaine dans coverageID pour savoir s'il concerne un paramètre de surface
        #    "then 
        #        echo coverageID concerne la surface;  # si oui, on n'ajoute rien au path
        #    else
        #        echo coverageID concerne un niveau;
        #        path=$path"&subset=height(10)";  # si non, on ajoute la valeur du niveau requis (à améliorer)
        #fi
fi