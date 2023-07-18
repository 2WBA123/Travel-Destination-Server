import { Router } from 'express';
import {
  createRole,
  getRoles,
  getRoleById,
  updateRole,
  deleteRole,
  rolesHasPermission,
} from './role.controller';

const router = Router();
router.get('/', getRoles);
router.get('/find/:uuid', getRoleById);
router.post('/', createRole);
router.put('/:uuid', updateRole);
router.delete('/:uuid', deleteRole);
router.post('/rolesHasPermission', rolesHasPermission);

export const roleRouter = router;
