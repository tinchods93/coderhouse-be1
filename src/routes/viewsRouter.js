const { Router } = require('express');
const Product = require('../entities/Product');

const viewsRouter = Router();

viewsRouter.get('/', (req, res) => {
  res.render('index', {
    title: 'Coderhouse - Backend 1 - Entrega 2',
  });
});

viewsRouter.get('/realtimeproducts', (req, res) => {
  res.render('realtimeproducts');
});

viewsRouter.get('/addProduct', (req, res) => {
  res.render('addProduct');
});

module.exports = viewsRouter;
