#!/bin/bash
# $1 est le nom du coverrageID
# $2 est la résolution du modele AROME
resol=$2
coverageId=$1
#var url ="https://geoservices.meteofrance.fr/services/"+model+service+"?SERVICE="+service+"&version=2.0.1&REQUEST=DescribeCoverage&CoverageId="+coverageId+"&token="+cle_jpmv;
# fabrication du path pour la requette decribeCoverage au WCS
model="MF-NWP-HIGHRES-AROME-"$resol"-FRANCE-WCS"  #   nom du modèle
path="https://geoservices.meteofrance.fr/services/"$model"?SERVICE=WCS&version=2.0.1&REQUEST=DescribeCoverage&CoverageId="
path=$path$coverageId"&token=__BvvAzSbJXLEdUJ--rRU0E1F8qi6cSxDp5x5AtPfCcuU__"  # path pour describeCoverage
echo "path pour describeCoverage : "$path
# Envoi de la requette describeCoverage au WCS
curl $path > desrcibedcoverage  # le describeCoverage est obtenu
# Analyse du describecverage obtenu pour connaitre toutes les échéances et les nivaux diponibles
champs="gmlrgrid:gridAxesSpanned" # pour extraire les noms des axes
grep "<"$champs">" desrcibedcoverage | sed  "s/<"$champs">/""/g" | sed  "s/<\/"$champs">/""/g" | sed  "s/^[ \t]*//g"  > tutu   # la liste a été fabriquée
longtutu=$(cat tutu | wc -l)
cat tutu | tail -n $(($longtutu - 2)) > lesAxes # on élimine les deux premiers noms (lat et lon)
champs="gmlrgrid:coefficients"  # pour extraire les valeurs des coefficients sur les axes
grep "<"$champs">" desrcibedcoverage | sed  "s/<"$champs">/""/g" | sed  "s/<\/"$champs">/""/g" | sed  "s/^[ \t]*//g"  > lesCoeff   # la liste a été fabriquée
echo "les coefficients dans lesCoeff : "
cat lesCoeff
echo "nombre de lignes de lesCoeff : "$(cat lesCoeff | wc -l)
echo "recherche des paths pour le coverageID (à programmer) : "$1   # A programmer
bash getLesPathsDesAxes.sh $coverageId