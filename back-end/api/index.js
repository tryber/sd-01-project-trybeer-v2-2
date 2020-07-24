const app = require('./server');
const http = require('../socket');

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Conectado na porta http://localhost:${PORT}`);
});

http.listen(8080, () => {
  console.log('Servidor socket ouvindo na porta 8080');
});
