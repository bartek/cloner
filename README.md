Development
====

    npm install

Setup watcher for changes:

    watchify ./main.js -o ./bundled.js -v

Run the server:

    npm start

Deploy bundled zip to server

    node ./scripts/deploy.js
