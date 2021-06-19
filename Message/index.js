
/*
const http = require("http");
const fs = require('fs').promises;

const host = 'localhost';
const port = 8000;

const requestListener = function (req, res) {
    console.log(
        `Request: ${req.method}, ${req.url}`
    );
    console.log(
        `Request headers: ${JSON.stringify(req.headers)}`
    );

    if (req.url !== "/getMessage" && req.url !== "/newMessage") {
        let fileName;
        let contentType;

        if (req.url === "/") {
            fileName = "index.html";
            contentType = "text/html";
        }
        else if (req.url.endsWith(".css")) {
            fileName = req.url.substr(1);
            contentType = "text/css";
        } else {
            res.writeHead(500);
            res.end("Error, unsupported");
            return;
        }

        fs.readFile(`${__dirname}/${fileName}`)
            .then(contents => {
                res.setHeader("Content-Type", contentType);
                res.writeHead(200);
                res.end(contents);
            })
            .catch(err => {
                res.writeHead(500);
                res.end(err);
                return;
            });
    }
    messageProcessing(req, res);
};    

let message, s = "";

function messageProcessing(req, res) {
    if (req.url === "/newMessage" && req.method === 'POST') {
        
        s = "";
        req.on('data', function (chunk) {
            s += chunk;
        }).on('end', function () {
            message = JSON.stringify(JSON.parse(s));
            console.log(message);
        });
    }
    else
        console.log("ERROR")
/*
    else if (req.url === "/getMessage" && req.method === 'GET') {
        res.setHeader("Content-Type", "application/json");
        res.writeHead(200);
        res.end(message);
        message = undefined;
        s = "";
    }

}

const server = http.createServer(requestListener);
server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});
*/

const http = require("http");
const fs = require('fs').promises;

const host = 'localhost';
const port = 8000;

const requestListener = function (req, res) {
    console.log(
        `Request: ${req.method}, ${req.url}`
    );
    console.log(
        `Request headers: ${JSON.stringify(req.headers)}`
    );

    if (req.url !== '/addData' && req.url !== '/getData') {
        let fileName;
        let contentType;

        if (req.url === "/") {
            fileName = "index.html";
            contentType = "text/html";
        }
        else if (req.url.endsWith(".css")) {
            fileName = req.url.substr(1);
            contentType = "text/css";
        } else {
            res.writeHead(500);
            res.end("Error, unsupported");
            return;
        }

        fs.readFile(`${__dirname}/${fileName}`)
            .then(contents => {
                res.setHeader("Content-Type", contentType);
                res.writeHead(200);
                res.end(contents);
            })
            .catch(err => {
                res.writeHead(500);
                res.end(err);
                return;
            });
    }
    AddAndGet(req, res);
};
/*
app.get('/getData', (req, res) => {
    res.status(200).send(msg);
});
*/

let message = "";

async function AddAndGet(req, res) {
    if (req.url === '/addData' && req.method === 'POST') {
        s = "";
        req.on('data', function (chunk) {
            s += chunk;
        }).on('end', function () {
            message = JSON.stringify(JSON.parse(s));
            console.log(message);
            res.writeHead(200);
            res.end();
        });
    }
    else if (req.url === '/getData' && req.method === 'GET') {
        res.writeHead(200);
        res.end(message);
    }
}

const server = http.createServer(requestListener);
server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});