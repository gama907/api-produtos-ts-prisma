import express from 'express';
import routes from './routes';

const app = express();
const PORT = 3000;

// Middleware para parsear o corpo das requisições como JSON
app.use(express.json());

// Adiciona as rotas da API
app.use(routes);

app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando em http://localhost:${PORT}`);
});

