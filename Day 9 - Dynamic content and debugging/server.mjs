import { createServer } from "http";

const port = 8080;
const hostname = "127.0.0.1";

const server = createServer((req, res) => {

    res.writeHead(200, { "Content-Type": "text/html" });
    const url = new URL(req.url, `http://${req.headers.host}`);
    console.log("User-Agent: " + req.headers['user-agent']);
    const name = url.searchParams.get("name");

    const body = `<html><body><h1>Hello ${name}</h1></body></html>`;
    res.write(body);
    res.end();

});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${server.address().port}/`);
});


