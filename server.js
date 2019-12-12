const mysql = require('mysql');
const fs = require('fs');
const http = require('http');

fs.readFile('./index.html', function (err, html) {
    //check for file read error
    if (err) {
        console.log(err);
    }

    http.createServer(function (request, response) {

        const { method } = request;

        if (method == "GET") {
            response.writeHead(200, {'Content-Type': 'text/html'});
            response.write(html);
            response.end();
        }

        else if (method == "POST") {
            //get the body data from the request
            let body = [];
            request.on('data', (chunk) => {
                body.push(chunk);
            }).on('end', () => {
                body = Buffer.concat(body).toString();
                // at this point, `body` has the entire request body stored in it as a string
                console.log("BODY");
                console.log(body);

                const connection = mysql.createConnection({
                    host: 'localhost',
                    port: '3306',
                    user: 'funpaxcg',
                    password: 'Roony10cory10',
                    database: 'funpaxcg_League',
                    connectTimeout: 100000
                });

                connection.connect(function(err) {
                    if (err) {
                        console.log("ERROR CONNECTING:");
                        console.log(err);
                    }

                    connection.query('Select Champion_Name from Champion_Info', function(err, results, fields)  {
                        if (err) {
                            console.log("ERROR PERFORMING QUERY:");
                            console.log(err);
                        }

                        console.log("RESULTS:");
                        console.log(results);

                        connection.destroy();
                    });
                });


            });
        }
    }).listen(8000);
});


// const sql = require('mssql');
// const fs = require('fs');
// const http = require('http');
// const url = require('url');
//
// fs.readFile('./index.html', function (err, html) {
//     //check for file read error
//     if (err) {
//         console.log(err);
//     }
//
//     http.createServer(function (request, response) {
//
//         const { method } = request;
//
//         if (method == "GET") {
//             response.writeHead(200, {'Content-Type': 'text/html'});
//             response.write(html);
//             response.end();
//         }
//
//         else if (method == "POST") {
//             //get the body data from the request
//             let body = [];
//             request.on('data', (chunk) => {
//                 body.push(chunk);
//             }).on('end', () => {
//                 body = Buffer.concat(body).toString();
//                 // at this point, `body` has the entire request body stored in it as a string
//                 console.log("BODY");
//                 console.log(body);
//
//                 //configuration options for connecting to the database
//                 const config = {
//                     user: 'funpaxcg',
//                     password: 'Roony10cory10',
//                     server: 'server163.web-hosting.com',
//                     encrypt: true,
//                     database: 'funpaxcg_League',
//                     stream: true,
//                     port: 2083,
//                     packetSize: 32768
//                 };
//
//                 sql.connect(config, function (err) {
//                     if (err) {
//                         console.log("ERROR CONNECTING TO SERVER");
//                         console.log(err);
//                     }
//
//                     const sqlRequest = new sql.Request();
//                     const query = 'Select Champion_Name from Champion_Info';
//                     sqlRequest.query(query, function (err, data) {
//                         if (err) {
//                             console.log("ERROR PERFORMING QUERY");
//                             console.log(err);
//                         }
//
//                         console.log("DATA");
//                         console.log(data);
//
//                         response.write(data);
//                         response.end();
//
//                         sql.close();
//                     });
//                 });
//             });
//         }
//     }).listen(8000);
// });