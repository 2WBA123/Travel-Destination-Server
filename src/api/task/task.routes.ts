import { Router } from 'express';
import {
  createTodoTask,
  getTodoTasks,
  getTodoTaskById,
  updateTodoTask,
  deleteShift,
} from './task.controller';

const router = Router();
router.get('/', getTodoTasks);
router.get('/:uuid', getTodoTaskById);
router.post('/', createTodoTask);
router.put('/:uuid', updateTodoTask);
router.delete('/:uuid', deleteShift);

export const TodoTaskRouter = router;
