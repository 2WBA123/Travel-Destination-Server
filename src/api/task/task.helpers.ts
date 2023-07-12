import { TodoTask } from '../../db/entities/todo-task.entity';

export const getTodoTask = async ({ uuid }: Partial<TodoTask> = {}) => {
  let found: TodoTask | null = null;
  try {
    found = await TodoTask.findOne(uuid);

    return found;
  } catch (e) {
    throw e;
  }
};
