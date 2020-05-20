const fs = require('fs');

const requestHandler = (req, res) => {
    const url = req.url;
    const method = req.method;

    if (url === '/') {
        res.setHeader('Content-Type', 'text/html');
        res.write('<html><head><title>Enter message</title></head>');
        res.write('<body><form action="/message" method="POST">' +
            '<input name="message" type="text"><button type="submit">Send</button>' +
            '</form></body></html>');
        return res.end();
    }
    if (url === '/message' && method === 'POST') {
        const reqBody = [];
        req.on('data', (chunk => {
            reqBody.push(chunk);
        }));
        req.on('end', () => {
            const parsedBody = Buffer.concat(reqBody).toString();
            fs.writeFile('message1.txt', `${parsedBody}`, (err) => {
                res.writeHead(302, {'Location': '/'})
                return res.end();
            });
        });
    }
}

module.exports = {requestHandler};