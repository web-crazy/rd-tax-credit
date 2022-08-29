import express from 'express';
import projectController from '../controllers/project.controller';

const projectRouter = express.Router();

projectRouter.get('/:id', projectController.get);
projectRouter.get('/', projectController.list);

export default projectRouter;
