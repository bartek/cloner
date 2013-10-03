Development
====

    npm install

Setup watcher for changes:

    watchify ./main.js -o ./bundled.js -v

Run the server:

    npm start

Deploy bundled zip to server

    node ./scripts/deploy.js

Locally Develop Gramework
=====

Because Gramework is in constant development as we progress games, this is kind
of important to do.

First, you'll want to clone the gramework repo somewhere on your computer. Officially, it's here:

    git clone https://github.com/plorry/gramework

Then you'll want to use npm link to link the folder inside cloner. This lets you
edit the gramework code and cloner will know about the changes. This is simply
done by:

    $ cd gramework/
    $ npm link

Then, cd into the cloner directory

    $ cd cloner/
    $ npm link gramework

Now, when you edit gramework code, which lives outside of the cloner repo, it'll
know about the changes instantly! It's basically a symlink.
    $ cd 

