
resol=$1  # la résolution ("0025" ou "001") est passée en premier paramètre
fichresultat=$2 # le nom du fichier des coverageIDLabel en second
bash ../fabriqueLesCoverageIDLabels.sh $resol $fichresultat
java TraiteLesCoverageIDLabels $resol $fichresultat