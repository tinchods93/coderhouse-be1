const express = require('express');
const productsRouter = require('./routes/productsRouter');
const cartsRouter = require('./routes/cartsRouter');
const initiateDb = require('./utils/initiateDb');

const app = express();
const port = 8080;

app.use(express.json());
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

// con esto levantamos el servidor
// en http://localhost:8080
app.listen(port, () => {
  console.log(`** Servidor iniciado en el puerto ${port} **`);
  console.log(`** Dominio: http://localhost:${port} **`);

  // validamos si existe el path y los archivos de la base de datos
  // si no existen, los creamos
  initiateDb();
});

module.exports = app;
