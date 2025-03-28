import { Server } from 'socket.io';
import httpServer from './services/httpServer.js';
import ProductRepository from './dao/repositories/productRepository.js';

const websocketServer = new Server(httpServer);

websocketServer.on('connection', async (socket) => {
  console.log('Un cliente se conectó');

  socket.emit('products', await ProductRepository.getAll());

  socket.on('deleteProduct', async (productId) => {
    await ProductRepository.delete(productId);
    websocketServer.emit('products', await ProductRepository.getAll());
    websocketServer.emit('productDeleted');
  });
});
