import { Router } from 'express';
import { TodoTaskRouter } from './api/task/task.routes';

const apiRouter = Router();
apiRouter.use('/awesome/applicant', TodoTaskRouter)

export { apiRouter };
