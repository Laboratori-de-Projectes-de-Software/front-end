#!/bin/bash -x 

# ¡¡¡ THIS FILE SHOULD BE LOCATED IN THE SAME DIRECTORY AS THE REPOSITORY (NOT IN IT) !!!

RESPONSE="HTTP/1.1 200 OK\r\nContent-Type: text/plain\r\n\r\nDeploying new commit(s)!"
LOG_FILE="deploy-logs/deployment_$(date +%Y%m%d_%H%M%S).log"
cd /home/kjorda/lab/

while true; do
    echo -e "$RESPONSE" | nc -l -p 9000 -q 0
    {
    cd Human-TrAIts/
    git restore .
    git pull origin main

    cd human-traits-front/
    #npm install
    npm run build
    rm -r ../debateia/src/main/resources/static/*
    cp -r dist/* ../debateia/src/main/resources/static/

    cd ../debateia/
    mvn clean install
    cp target/debateia*.jar ../../debateia.jar

    cd ../..
    docker build -t debateia .
    docker stop lab || true
    docker rm lab || true
    docker run --name lab -d --restart always --network="host" debateia
    # have to run in --netwok="host" mode to access the database, should find a better fix probably
    # -p 8080:8080

    } 2>&1 | tee "$LOG_FILE"

done
