getDateCoverageID(){
    # fonction qui extrait la date d'un coverageID de MF
    # mise au format AAAA-MM-JJTHH:MM:00Z
    coverageID=$1  # le coverageID est passé comme premier paramètre
    #echo "coverageID  : "$1   # le coverageID est passé comme premier paramètre
    dateCoverageID=$(echo $1 | awk -F "___" '{print $2}' | sed s/"\."/":"/g)  # décodage et reformatage de l'heure UTC contenu dans le coverageID
    dateCoverageID=${dateCoverageID:0:19}   
    echo $dateCoverageID
}