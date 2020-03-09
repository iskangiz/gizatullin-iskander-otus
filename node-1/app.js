const http = require('http');

const timeoutPromise = (timeout) => new Promise((resolve) => setTimeout(resolve, timeout));
const server = http.createServer();
server.on('request', (req, res) => {
    timeoutPromise(1000).then(()=> {
        const data = 1;
        res.end(JSON.stringify(data));
    });
});

server.listen(3000);