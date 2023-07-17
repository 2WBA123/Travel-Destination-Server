import { Router } from 'express';
import { authRouter } from './api/Auth/auth.routes';
import { roleRouter } from './api/role/role.routes';

const apiRouter = Router();
apiRouter.use('/auth', authRouter)
apiRouter.use('/role', roleRouter)

export { apiRouter };
