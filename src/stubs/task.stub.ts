import faker from 'faker';
import { TodoTask } from '../db/entities/todo-task.entity';

export const createTodoTask = async (save = true) => {
  const t = new TodoTask();
  t.uuid = faker.datatype.uuid();
  t.fullName = faker.name.firstName();
  t.email = faker.name.findName();
  t.contactNo = faker.name.findName();

  if (save) {
    return await t.save();
  }
  return t;
};

export const createManyTodoTasks = async (times: number) => {
  const tasks: TodoTask[] = [];
  for (let i = 0; i < times; i++) {
    const task = await createTodoTask();
    tasks.push(task);
  }
  return tasks;
};
