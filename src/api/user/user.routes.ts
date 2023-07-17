import { Router } from 'express';
import {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  userHasRoles,
  userHasPermissions
} from './user.controller';

const router = Router();
router.get('/', getUsers);
router.get('/find/:uuid', getUserById);
router.post('/', createUser);
router.put('/:uuid', updateUser);
router.delete('/:uuid', deleteUser);
router.post('/userHasRoles', userHasRoles);
router.post('/userHasPermissions', userHasPermissions);

export const userRouter = router;
