const { Server } = require('socket.io');
const httpServer = require('./services/httpServer');
const Product = require('./entities/Product');

const websocketServer = new Server(httpServer);

websocketServer.on('connection', async (socket) => {
  console.log('Un cliente se conectó');

  socket.emit('products', await Product.getAll());

  socket.on('deleteProduct', async (productId) => {
    await Product.delete(productId);
    websocketServer.emit('products', await Product.getAll());
    websocketServer.emit('productDeleted');
  });
});
