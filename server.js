const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');

const PORT = process.env.PORT || 3000;
const ROOT_DIR = __dirname;
const DATA_FILE = path.join(ROOT_DIR, 'data', 'leads.json');

function ensureDataFile() {
  fs.mkdirSync(path.dirname(DATA_FILE), { recursive: true });
  if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, '[]', 'utf8');
  }
}

function readLeads() {
  ensureDataFile();
  return JSON.parse(fs.readFileSync(DATA_FILE, 'utf8'));
}

function writeLeads(leads) {
  ensureDataFile();
  fs.writeFileSync(DATA_FILE, JSON.stringify(leads, null, 2), 'utf8');
}

function parseBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => {
      body += chunk.toString();
    });
    req.on('end', () => {
      if (!body) {
        resolve({});
        return;
      }

      const contentType = req.headers['content-type'] || '';

      if (contentType.includes('application/json')) {
        try {
          resolve(JSON.parse(body));
        } catch (error) {
          reject(new Error('JSON inválido'));
        }
        return;
      }

      if (contentType.includes('application/x-www-form-urlencoded')) {
        const params = new URLSearchParams(body);
        const parsed = {};
        params.forEach((value, key) => {
          parsed[key] = value;
        });
        resolve(parsed);
        return;
      }

      resolve({});
    });
    req.on('error', reject);
  });
}

function sendJson(res, statusCode, payload) {
  res.writeHead(statusCode, { 'Content-Type': 'application/json; charset=utf-8' });
  res.end(JSON.stringify(payload));
}

function serveFile(res, filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const contentTypes = {
    '.html': 'text/html; charset=utf-8',
    '.js': 'application/javascript; charset=utf-8',
    '.json': 'application/json; charset=utf-8',
    '.css': 'text/css; charset=utf-8'
  };

  fs.readFile(filePath, (error, content) => {
    if (error) {
      sendJson(res, 404, { error: 'Arquivo não encontrado' });
      return;
    }

    res.writeHead(200, { 'Content-Type': contentTypes[ext] || 'text/plain; charset=utf-8' });
    res.end(content);
  });
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);

  if (req.method === 'GET' && url.pathname === '/api/health') {
    sendJson(res, 200, { ok: true, message: 'Backend ativo' });
    return;
  }

  if (req.method === 'GET' && (url.pathname === '/' || url.pathname === '/index.html')) {
    serveFile(res, path.join(ROOT_DIR, 'index.html'));
    return;
  }

  if (req.method === 'GET') {
    const requestedPath = url.pathname === '/' ? '/index.html' : url.pathname;
    const filePath = path.join(ROOT_DIR, requestedPath);

    if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
      serveFile(res, filePath);
      return;
    }

    serveFile(res, path.join(ROOT_DIR, 'index.html'));
    return;
  }

  if (req.method === 'GET' && url.pathname === '/api/leads') {
    sendJson(res, 200, readLeads());
    return;
  }

  if (req.method === 'POST' && url.pathname === '/api/lead') {
    try {
      const data = await parseBody(req);
      const name = String(data.name || '').trim();
      const email = String(data.email || '').trim();
      const company = String(data.company || '').trim();

      if (!name || !email || !company) {
        sendJson(res, 400, { error: 'Preencha nome, email e empresa.' });
        return;
      }

      const leads = readLeads();
      const newLead = {
        id: Date.now().toString(36),
        name,
        email,
        company,
        createdAt: new Date().toISOString()
      };

      leads.push(newLead);
      writeLeads(leads);

      sendJson(res, 201, { success: true, lead: newLead });
    } catch (error) {
      sendJson(res, 400, { error: error.message || 'Erro ao processar solicitação' });
    }
    return;
  }

  sendJson(res, 404, { error: 'Rota não encontrada' });
});

server.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
