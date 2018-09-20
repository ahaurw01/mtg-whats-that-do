const { createServer } = require('http');
const next = require('next');
const app = next({ dev: true });
const handle = app.getRequestHandler();
const { parse } = require('url');

const pageRegexp = /^[/].{9}?/;

app.prepare().then(() => {
  createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    const { pathname, query } = parsedUrl;
    if (pageRegexp.test(pathname)) app.render(req, res, '/', query);
    else handle(req, res, parsedUrl);
  }).listen(1337, err => {
    if (err) throw err;
    console.log('> Ready on http://localhost:1337');
  });
});
