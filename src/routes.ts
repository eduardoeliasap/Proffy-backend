import express from 'express';
import ClasseController from './controllers/ClasseController';

const routes = express.Router();

const classeController = new ClasseController();

routes.post('/classes', classeController.create);

export default routes;