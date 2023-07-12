import { ApiMessageEnum, ControllerFunction } from '../models';
import { TodoTask } from '../../db/entities/todo-task.entity';
import { getTodoTask } from './task.helpers';

export const getTodoTasks: ControllerFunction<TodoTask[] | TodoTask | null> = async (
  req,
  res
) => {
  let found: TodoTask[] | TodoTask = [];
  const {
    query: { email },
  } = req;

  found = await TodoTask.find();
  return res
    .status(200)
    .json({ message: ApiMessageEnum.OK, statusCode: 200, data: found });
};

export const createTodoTask: ControllerFunction<TodoTask> = async (req, res) => {
  const { body } = req;
  const {
    fullName,
    email,
    contactNo,
  } = body;
  try {
    const created = TodoTask.create({
      fullName,
      email,
      contactNo,
    });

    await created.save();
    return res
      .status(200)
      .json({ data: created, message: ApiMessageEnum.OK, statusCode: 200 });
  } catch (e) {
    return res.status(400).json({ statusCode: 400, message: e.message });
  }
};

export const getTodoTaskById: ControllerFunction<TodoTask> = async (req, res) => {
  try {
    const { uuid } = req.params;
    const found = await getTodoTask({ uuid: uuid });
    return res
      .status(200)
      .json({ message: ApiMessageEnum.OK, statusCode: 200, data: found });
  } catch (e) {
    return res.status(400).json({ message: e.message, statusCode: 400 });
  }
};


export const updateTodoTask: ControllerFunction<TodoTask> = async (req, res) => {
  try {
    const { uuid } = req.params;

    await TodoTask.save({ uuid, ...req.body });
    const found = await getTodoTask({ uuid });
    return res
      .status(200)
      .json({ message: ApiMessageEnum.OK, statusCode: 200, data: found });
  } catch (e) {
    return res.status(400).json({ message: e.message, statusCode: 400 });
  }
};

export const deleteShift: ControllerFunction<TodoTask> = async (req, res) => {
  try {
    const { uuid } = req.params;
    const deleted = await TodoTask.delete({ uuid });
    if (deleted.affected > 0) {
      return res
        .status(200)
        .json({ message: ApiMessageEnum.OK, statusCode: 200 });
    }
    return res
      .status(400)
      .json({ message: ApiMessageEnum.NOT_FOUND, statusCode: 404 });
  } catch (e) {
    return res
      .status(400)
      .json({ message: e.message, statusCode: 400, errors: e });
  }
};
