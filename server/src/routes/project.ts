import express from 'express';
import projectController from '../controllers/project.controller';

const projectRouter = express.Router();

projectRouter.get('/:id', projectController.get);
projectRouter.put('/:id', projectController.update);
projectRouter.delete('/:id', projectController.remove);
projectRouter.get('/', projectController.list);
projectRouter.post('/', projectController.create);

export default projectRouter;
