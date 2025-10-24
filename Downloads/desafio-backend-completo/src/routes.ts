import { Router } from 'express';
import { ProductController } from './controllers/ProductController';

const routes = Router();
const productController = new ProductController();

// Rotas para /api/produtos
routes.get('/api/produtos', productController.findAll.bind(productController));
routes.get('/api/produtos/:id', productController.findById.bind(productController));
routes.post('/api/produtos', productController.create.bind(productController));
routes.put('/api/produtos/:id', productController.update.bind(productController));
routes.delete('/api/produtos/:id', productController.delete.bind(productController));

export default routes;

