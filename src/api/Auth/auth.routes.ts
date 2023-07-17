import { Router } from 'express';
import {
  microsoftExternalLogin,
  microsoftExternalLoginRedirect,
  loginLocalUser,
  refreshTokenUser
} from './auth.controller';

const router = Router();
router.post('/user/local/login', loginLocalUser);
router.post('/user/refreshToken', refreshTokenUser);
router.get('/user/externallogin', microsoftExternalLogin);
router.get('/user/externallogin/redirect', microsoftExternalLoginRedirect);

export const authRouter = router;
