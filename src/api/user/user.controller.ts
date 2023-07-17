import { User } from '../../db/entities/user.entity';
import { ApiMessageEnum, ControllerFunction } from '../models';
import { getUser, createUserRoles, createUserPermissions } from './user.helpers';
const bcrypt = require('bcrypt');

export const getUsers: ControllerFunction<User[] | User | null> = async (
  req,
  res
) => {
  let found: User[] | User = [];
  const {
    query: { email },
  } = req;

  if (email) {
    found = await getUser({
      email: email && email.toString(),
    });
  } else {
    found = await User.find({ relations: ['roles', 'permissions', 'employee'] });
  }
  return res
    .status(200)
    .json({ message: ApiMessageEnum.OK, statusCode: 200, data: found });
};

export const createUser: ControllerFunction<User> = async (req, res) => {
  const { body } = req;
  const {
    email,
    type,
    fullName,
    password,
    status,
    createdBy,
    updatedBy,
    employee,
  } = body;

  try {
    var hashPassword = await bcrypt.hash(password, 10);
    const created = User.create({
      email,
      type,
      fullName,
      password: hashPassword,
      status,
      createdBy,
      updatedBy,
      employee,
    });
    await created.save();
    const userId = created.uuid
    const roles = body.roles
    const permissions = body.permissions
    await createUserRoles(userId, roles);
    await createUserPermissions(userId, permissions);
    return res
      .status(200)
      .json({ data: created, message: ApiMessageEnum.OK, statusCode: 200 });
  } catch (e) {
    return res.status(400).json({ statusCode: 400, message: e.message });
  }
};

export const getUserById: ControllerFunction<User> = async (req, res) => {
  try {
    const { uuid } = req.params;
    const found = await getUser({ uuid });
    return res
      .status(200)
      .json({ message: ApiMessageEnum.OK, statusCode: 200, data: found });
  } catch (e) {
    return res.status(400).json({ message: e.message, statusCode: 400 });
  }
};

export const updateUser: ControllerFunction<User> = async (req, res) => {
  try {
    const { body } = req;
    const { uuid } = req.params;
    await User.save({ uuid, ...req.body });
    const found = await getUser({ uuid });
    const userId = uuid
    const roles = body.roles
    const permissions = body.permissions
    await createUserRoles(userId, roles);
    await createUserPermissions(userId, permissions);
    return res
      .status(200)
      .json({ message: ApiMessageEnum.OK, statusCode: 200, data: found });
  } catch (e) {
    return res.status(400).json({ message: e.message, statusCode: 400 });
  }
};

export const deleteUser: ControllerFunction<User> = async (req, res) => {
  try {
    const { uuid } = req.params;
    const deleted = await User.delete({ uuid });
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

export const userHasRoles: ControllerFunction<User> = async (req, res) => {
  const { body } = req;
  try {
    const userId = body.user
    const roles = body.roles
    const userRoles = await createUserRoles(userId, roles);
    return res
      .status(200)
      .json({ data: userRoles, message: ApiMessageEnum.OK, statusCode: 200 });
  } catch (e) {
    return res.status(400).json({ statusCode: 400, message: e.message });
  }
};

export const userHasPermissions: ControllerFunction<User> = async (req, res) => {
  const { body } = req;
  try {
    const userId = body.user
    const permissions = body.permissions
    const userPermissions = await createUserPermissions(userId, permissions);

    return res
      .status(200)
      .json({ data: userPermissions, message: ApiMessageEnum.OK, statusCode: 200 });
  } catch (e) {
    return res.status(400).json({ statusCode: 400, message: e.message });
  }
};
