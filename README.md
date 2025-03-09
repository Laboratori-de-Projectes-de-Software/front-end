# How to build the front app to later run it in the server 
## Automatically (on Windows)
### Run the following either command inside the human-traits-font directory
    buildFront2Back.cmd


## Manually
### Run the following either command inside the human-traits-font directory
    npm run build
### or
    yarn run build

### After that just go to the human-traits-font/dist directory and copy all of that into the 
### debateia/src/main/resources/static/ folder, and substitute the assets folder and the index.html file