const http = require('http');

const payload = {
  matricula: "FUNC123",
  nome: "Gabriel Melo",
  username: "gabriel.melo",
  senha: "senhaSegura123",
  email: "gabriel.melo@example.com"
};

const data = JSON.stringify(payload);

const options = {
  hostname: 'localhost',
  port: 3000,
  path: '/funcionarios',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(data)
  }
};

const req = http.request(options, (res) => {
  let body = '';
  res.setEncoding('utf8');
  res.on('data', (chunk) => body += chunk);
  res.on('end', () => {
    console.log('HTTP_STATUS:', res.statusCode);
    try {
      const parsed = JSON.parse(body);
      console.log('RESPONSE_BODY:', JSON.stringify(parsed, null, 2));
    } catch (e) {
      console.log('RESPONSE_BODY (raw):', body);
    }
  });
});

req.on('error', (e) => {
  console.error('REQUEST_ERROR:', e.message);
});

req.write(data);
req.end();
