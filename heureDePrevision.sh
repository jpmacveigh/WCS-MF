heureDePrevision() {   # fonction qui calcul l'heure d'une prévision
# premier paramètre $1 : date du run au format : AAAA-MM-JJTHH:MM:SSZ
# second paramètre  $2 : échéance de la prévision en secondes
# affiche l'heure de la prévsion dans le même format
    dateRun=$1
    #echo "date du Run : "$dateRun
    echeanceSeconde=$2
    #echo "Echéance : "$echeanceSeconde
    declare dateRun=$(date -d $dateRun "+%Y-%m-%dT%H:%M:%SZ") # on fabrique une date à partir d'une chaine
    #echo "date du Run          : "$dateRun
    declare dateRunTS=$(date -d $dateRun "+%s") # on récupère son timeStamp 
    #echo "écheance (secondes)  : "$echeanceSeconde
    datePrevisionTS=$(($dateRunTS+$echeanceSeconde))  # on ajoute à son timeStamp l'échéance en secondes
    datePrevision=$(date -d @$datePrevisionTS "+%Y-%m-%dT%H:%M:%SZ")
    #echo "date de la prévision : "$datePrevision
    echo $datePrevision
}