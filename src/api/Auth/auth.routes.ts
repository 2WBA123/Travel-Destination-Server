import { Router } from 'express';
import {
  loginLocalUser,
  refreshTokenUser
} from './auth.controller';

const router = Router();
router.post('/user/local/login', loginLocalUser);
router.post('/user/refreshToken', refreshTokenUser);

export const authRouter = router;
