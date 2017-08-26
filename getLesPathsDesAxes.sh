#!/bin/bash

    # $1 : le coverageID de MF (pour en extraire l'heure du run)
    # 
    coverageID=$1
    #coverageID="GEOMETRIC_HEIGHT__GROUND_OR_WATER_SURFACE___2017-08-21T21.00.00Z"
    dateCoverageID=$(echo $1 | awk -F "___" '{print $2}' | sed s/"\."/":"/g)  # décodage et reformatage de l'heure UTC contenu dans le coverageID
    echo "date du coverageID : "$dateCoverageID
    declare -a nomsAxes
    while read axe
    do
        nomsAxes=( "${nomsAxes[@]}" $axe )
    done < lesAxes
    #echo "noms des Axes : "${nomsAxes[@]}
    nombreAxes=$(cat lesAxes | wc -l)
    #echo "nombre d'axes : "$nombreAxes
    rang=0
    . heureDePrevision.sh
    while read coeff
    do
        rm ${nomsAxes[$rang]}   # initialisation du fichier qui porte le nom de l'axe
        for i in `echo $coeff | tr "," " "`
        do
            #echo ${nomsAxes[$rang]}"="$i
            chaine=$i
            if [ ${nomsAxes[$rang]} = "time" ]  # il faut calculer l'heure de la prévision
            then
               heurePrevision=$(heureDePrevision $dateCoverageID $i)
               chaine=$heurePrevision
            fi
            echo "&subset="${nomsAxes[$rang]}"("$chaine")" >> ${nomsAxes[$rang]}  # écriture dans le fichier
        done
        rang=$(($rang + 1))
    done < lesCoeff
    echo "nombres d'axes : "$nombreAxes
    rm lesPaths
    if [ $nombreAxes -eq 1 ]
    then
        while read leCoeff
        do
            echo $leCoeff >> lesPaths
        done < ${nomsAxes[0]}
    else
        while read leCoeff1
        do
            while read leCoeff2
            do
                echo $leCoeff1$leCoeff2 >> lesPaths
            done < ${nomsAxes[1]}
        done < ${nomsAxes[0]}
    fi