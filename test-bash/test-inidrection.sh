nomVar=x              # j'assigne le caractère "x" à la variable nommée "nomVar"
eval $nomVar=2        # j'assigne le caractère "2" à la variable dont le nom est contenu dans la variable "nomVar"
echo $nomVar          # j'affiche la valeur qui avait été assignée à la variable nommée "nomVar"
#eval echo \$$nomVar   # j'affiche la valeur qui avait été assignée à la variable dont le nom est contenu dans la variable "nomVar"
echo $x

maVar="x"            # maVar vaut x             
declare $maVar=2    # x vaut 2
echo $x             # affiche 2
echo ${!maVar}      # pareil que précédemment
declare $maVar=3
echo $x

lesNoms=("height" "time" "lat" "lon")
for nom in ${lesNoms[@]}
do
    echo $nom
    declare -a $nom
    valeurs=( 1 2 3 "a")
    for i in "${valeurs[@]}"
    do
        echo $i
        
    done    
    
done