const http = require('http');
const url = require('url');
const StringDecoder = require('string_decoder').StringDecoder;

const server = http.createServer((req, res) => {
  const { headers, method, url: unparsedUrl } = req;
  const parsedUrl = url.parse(unparsedUrl, true);

  const path = parsedUrl.pathname;
  const trimmedPath = path.replace(/^\/+|\/+$/g, '');

  const queryStringObject = parsedUrl.query;

  const decoder = new StringDecoder('utf-8');
  var buffer = '';

  req.on('data', (data) => {
    buffer += decoder.write(data);
  });

  req.on('end', () => {
    buffer += decoder.end();

    res.end('hello world!\n');

    console.log(
      method,
      ' - ',
      trimmedPath,
      ' - ',
      queryStringObject,
      ' - ',
      headers,
      ' - ',
      buffer
    );
  });
});

const port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log('Server on port', port);
});
