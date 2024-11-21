const { createServer } = require('node:http');

const server = createServer((req, res) => {

    try {

        if (req.url === '/html') {
            res.writeHead(201, {
                'Content-Type': 'text/html; charset=utf-8'
            });
            res.write('<h1>Hello World</h1>');
            res.write('<p>Sending content as HTML with write method</p>');
            res.end(`<p>Request is coming from  URL: ${req.url}</p>`);
        } else if (url === '/') {
            res.writeHead(200, {
                'Content-Type': 'text/plain; charset=utf-8'
            });
            res.write('Hello World');
            res.end();
        } else {
            res.writeHead(404);
            res.write(`The page you're looking for is not found`);
            res.end();
        }
    } catch (err) {
        console.log(err);
        res.writeHead(500);
        res.write(`Internal Server Error`);
        res.end();
    }
});

server.listen(3000, '127.0.0.1', () => {
    console.log(`Server running at http://127.0.0.1:${server.address().port}/`);
})