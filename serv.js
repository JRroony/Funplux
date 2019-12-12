const mysql = require('mysql');
const fs = require('fs');
const http = require('http');

fs.readFile('./temp1.html', function (err, html) {
    //check for file read error
    if (err) {
        console.log(err);
        // --------- Change path to whatever directory the log file should be stored -------------
        fs.writeFile('C:\\Users\\kier\\Documents\\log.txt', err.message, function(err) {
            if (err) {}
            console.log("ERROR WRITING TO FILE:");
            console.log(err);
        });
    }

    http.createServer(function (request, response) {

        const { method } = request;

        //send index file
        if (method == "GET") {
            console.log("GET request, server index.html file");
            response.writeHead(200, {'Content-Type': 'text/html'});
            response.write(html);
            response.end();
        }

        //process query request
        else if (method == "POST") {
            //get the body data from the request
            let body = [];
            request.on('data', (chunk) => {
                body.push(chunk);
            }).on('end', () => {
                body = Buffer.concat(body).toString();
                //body variable has the entire request body stored in it as a string
                console.log("BODY");
                console.log(body);

                let query = body.split("=")[1];

                //replace \ with space
                query = query.replace(/%5C/g, " ");

                //certain characters (<, >, +, and /) are html encoded
                query = query.replace(/%3C/g, "<");
                query = query.replace(/%3E/g, ">");
                query = query.replace(/%2B/g, "+");
                query = query.replace(/%2F/g, "/");

                console.log(query);

                const connection = mysql.createConnection({
                    host: 'localhost',
                    port: '3306',
                    user: 'root',
                    password: 'Exile-97',
                    database: 'funpaxcg_league',
                    connectTimeout: 3000
                });

                //connect to mysql server
                connection.connect(function(err) {
                    if (err) {
                        console.log("ERROR CONNECTING:");
                        console.log(err);
                        fs.writeFile('C:\\Users\\kier\\Documents\\log.txt', err.message,function(err) {
                            if (err) {}
                            console.log("ERROR WRITING TO FILE:");
                            console.log(err);
                        });
                    }

                    //query the mysql server
                    connection.query(query, function(err, results, fields)  {
                        if (err) {
                            console.log("ERROR PERFORMING QUERY:");
                            console.log(err);
                            fs.writeFile('C:\\Users\\kier\\Documents\\log.txt', err.message, function(err) {
                                if (err) {}
                                console.log("ERROR WRITING TO FILE:");
                                console.log(err);
                            });
                        }

                        //console.log("RESULTS:");
                        //console.log(results);

                        const h = '<h1 style="background:#4194ed;">Query results</h1>';
                        let table = '<table style="margin-left:20px;">';
                        let rows = '<tr></tr>';

                        Object.keys(results[0]).forEach( (key) => {
                            rows = rows + `<td><b>${key}</b></td>`;
                        });

                        rows = rows + '</tr>';

                        Object.keys(results).forEach( (key) => {
                            rows = rows + '<tr>';
                            Object.keys(results[key]).forEach( (innerKey) => {
                                //console.log(innerKey, ' => ', results[key][innerKey]);
                                rows = rows + '<td>' + JSON.stringify(results[key][innerKey]) + '</td>';
                            });
                            rows = rows + '</tr>';
                        });

                        table = table + rows + '</table>';

                        // ------------------------------ Put output HTML code here ------------------------------------

                        //console.log("TABLE:");
                        //console.log(h,table);

                        connection.destroy();
                        response.writeHead(200, {'Content-Type': 'text/html'});
                        response.write(h + table);
                        response.end();
                    });
                });


            });
        }
    }).listen(8000);
});