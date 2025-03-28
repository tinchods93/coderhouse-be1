import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import { engine } from 'express-handlebars';
import path from 'path';
import cors from 'cors';
import { fileURLToPath } from 'url';
import productsRouter from '../routes/productsRouter.js';
import cartsRouter from '../routes/cartsRouter.js';
import viewsRouter from '../routes/viewsRouter.js';
import requestLogger from '../middlewares/requestLogger.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const port = process.env.PORT ?? 8080;
const app = express();
const uri = 'mongodb://127.0.0.1:27017/coderhouse-backend-mds';

const corsOptions = {
  origin: 'http://localhost:3000', // voy a usar esta api para las entregas de coderhouse-react
  optionsSuccessStatus: 200, // esto es para que responda con status 200 en caso de que todo salga bien
};

mongoose.connect(uri);

// Handlebars
app.engine('handlebars', engine());
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
});

export default httpServer;
