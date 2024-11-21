const { createServer } = require('node:http');

const hostname = '127.0.0.1'; // localhost
const port = 2000;
// port0 - 65535 - complete range of port numbers that can be used by a server
// port 0 - 1023 - reserved ports - you need admin privileges


const server = createServer((request, response) => {
    console.log(request.url, request.method);
    // console.log(request.headers['user-agent']);

    response.statusCode = 200;
    if (request.url === '/html') {

        response.setHeader('Content-Type', 'text/html');
        const html = `
                    <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8" />
                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                    <title>Nodejs Serving HTML</title>
                </head>
                <body>
                    <h2>Nodejs Serving HTML</h2>
                </body>
                </html>

    `;
        response.end(html);
    } else if (request.url.includes('/json')) {
        response.setHeader('Content-Type', 'application/json');
        const data = {
            name: 'John Doe',
            age: 30,
        }
        response.end(JSON.stringify(data));

    } else {
        response.setHeader('Content-Type', 'text/plain');
        response.end('Hello World');
    }
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
})



