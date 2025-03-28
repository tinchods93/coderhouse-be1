import { Router } from 'express';

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

viewsRouter.get('/about', (req, res) => {
  res.render('about',{
    title: '¡Guía de Uso!'
  });
});

export default viewsRouter;
