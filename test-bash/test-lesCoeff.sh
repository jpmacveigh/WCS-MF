axes=("height" "time")
echo ${axes[@]}
compteur=0
while read line
do
    echo "ligne "$compteur" : "$line
    nomTableau=${axes[$compteur]}  # on construit le nom du tableau avec les contenu de axes
    echo "nom du tableau : "$nomTableau
    unset $nomTableau
    echo "contenu juste avant fabrication du tableau : "${nomTableau[@]} # ne devrait pas exister ?
    declare -a $nomTableau   # création du tableau indicé
    echo "contenu juste après fabrication du tableau : "${nomTableau[@]} # devrait être vide ?
    for i in `echo $line | tr "," " "`
    do
        nomTableau=( "${nomTableau[@]}" $i )
    done
    echo "nom du tableau fabriqué : "$nomTableau" : "${nomTableau[@]}
    echo ${nomTableau[5]}
    #for j in ${nomTableau[@]}
    #do
        #echo $nomTableau"="$j
    #done
    unset $nomTableau
    compteur=$(($compteur + 1))
done < ./lesCoeff