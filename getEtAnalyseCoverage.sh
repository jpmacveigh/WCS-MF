#!/bin/bash
path=$1  # les path à utiliser pour le getCoverage est passé en premier parametre
echo "path pour getCoverage : "$path
curl $path > tifftempo # envoi de la requête getCoverage au service WCS
node ../test-geotiff.js >> resultNode 2>>resultNode # décodage et traitement du coverage reçu avec geotiff.js sous node 
       