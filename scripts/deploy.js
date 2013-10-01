// Upload bundled game to server.
var AdmZip = require('adm-zip'),
    fs = require('fs'),
    scp = require('scp');

var zip = new AdmZip();
zip.addLocalFile('./index.html');
zip.addLocalFile('./bundled.js');
zip.writeZip('./deploy.zip');

var options = {
    port: 1189,
    user: 'admin',
    host: 'whahay.net',
    file: './deploy.zip',
    path: '~/domains/whahay.net/www/deploy.zip'
};

scp.send(options, function(err) {
    if (err) console.log(err);
});
