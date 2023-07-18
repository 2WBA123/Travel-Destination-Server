import { Router } from 'express';
import { roleRouter } from './api/role/role.routes';
import { userRouter } from './api/user/user.routes';

const apiRouter = Router();
apiRouter.use('/user', userRouter)
apiRouter.use('/role', roleRouter)

export { apiRouter };
