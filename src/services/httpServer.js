require('dotenv').config();
const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const cors = require('cors');
const productsRouter = require('../routes/productsRouter');
const cartsRouter = require('../routes/cartsRouter');
const viewsRouter = require('../routes/viewsRouter');
const initiateDb = require('../utils/initiateDb');
const requestLogger = require('../utils/requestLogger');

const port = process.env.PORT ?? 8080;
const app = express();

const corsOptions = {
  origin: 'http://localhost:3000', // voy a usar esta api para las entregas de coderhouse-react
  optionsSuccessStatus: 200, // esto es para que responda con status 200 en caso de que todo salga bien
};

// Handlebars
app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, '../views'));

// Middlewares
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

app.use('/api/products', requestLogger, productsRouter);
app.use('/api/carts', requestLogger, cartsRouter);
app.use('/', viewsRouter);

// con esto levantamos el servidor
// en http://localhost:8080
const httpServer = app.listen(port, () => {
  console.log(`** Servidor iniciado en el puerto ${port} **`);
  console.log(`** Dominio: http://localhost:${port} **`);

  // validamos si existe el path y los archivos de la base de datos
  // si no existen, los creamos
  initiateDb();
});

module.exports = httpServer;
