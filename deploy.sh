#!/bin/bash

cd human-traits-front/
#npm install # (only necessary first time)
npm run build
rm -r ../debateia/src/main/resources/static/*
cp -r dist/* ../debateia/src/main/resources/static/

cd ../debateia/
mvn clean install
cp target/debateia*.jar ../debateia.jar

echo "Ejecuta el servidor con: java -jar debateia.jar"
echo "Accede a la pagina en: http://localhost:8080"
