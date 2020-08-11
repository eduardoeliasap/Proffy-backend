import express from 'express';
import ClasseController from './controllers/ClasseController';
import ConnectionsController from './controllers/ConnectionsController';

const routes = express.Router();

const classeController = new ClasseController();
const connectionsController = new ConnectionsController();

routes.get('/classes', classeController.index);
routes.post('/classes', classeController.create);

routes.post('/connections', connectionsController.create);
routes.get('/connections', connectionsController.index);

export default routes;