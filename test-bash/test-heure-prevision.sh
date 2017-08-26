#!/bin/bash
. ../heureDePrevision.sh    # on charge la fonction heureDePrevion
h=$(heureDePrevision "2012-08-22T12:00:00Z" "3600*20")  # on s'en sert
echo $h
