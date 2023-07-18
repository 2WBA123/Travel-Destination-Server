import { ApiMessageEnum, ControllerFunction } from '../models';
import { Role } from '../../db/entities/role.entity';
import { getRole } from './role.helpers';
import { getConnection } from 'typeorm';

export const getRoles: ControllerFunction<Role[] | Role | null> = async (
  req,
  res
) => {
  let found: Role[] | Role = [];

  found = await Role.find({ relations: ['permissions'] });
  return res
    .status(200)
    .json({ message: ApiMessageEnum.OK, statusCode: 200, data: found });
};

export const createRole: ControllerFunction<Role> = async (req, res) => {
  const { body } = req;
  const { name, guard } = body;

  try {
    const created = Role.create({
      name,
    });

    await created.save();
    return res
      .status(200)
      .json({ data: created, message: ApiMessageEnum.OK, statusCode: 200 });
  } catch (e) {
    return res.status(400).json({ statusCode: 400, message: e.message });
  }
};

export const getRoleById: ControllerFunction<Role> = async (req, res) => {
  try {
    const { uuid } = req.params;
    const found = await getRole({ uuid: uuid });
    return res
      .status(200)
      .json({ message: ApiMessageEnum.OK, statusCode: 200, data: found });
  } catch (e) {
    return res.status(400).json({ message: e.message, statusCode: 400 });
  }
};

export const updateRole: ControllerFunction<Role> = async (req, res) => {
  try {
    const { uuid } = req.params;

    await Role.save({ uuid, ...req.body });
    const found = await getRole({ uuid });
    return res
      .status(200)
      .json({ message: ApiMessageEnum.OK, statusCode: 200, data: found });
  } catch (e) {
    return res.status(400).json({ message: e.message, statusCode: 400 });
  }
};

export const deleteRole: ControllerFunction<Role> = async (req, res) => {
  try {
    const { uuid } = req.params;
    const deleted = await Role.delete({ uuid });
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

export const rolesHasPermission: ControllerFunction<Role> = async (
  req,
  res
) => {
  const { body } = req;
  let created = undefined;
  try {
    await getConnection()
      .createQueryBuilder()
      .delete()
      .from('role_has_permissions')
      .where('role_id = :id', { id: body.role })
      .execute();
    for (let data of body.permission) {
      created = await getConnection()
        .createQueryBuilder()
        .insert()
        .into('role_has_permissions')
        .values([{ permission_id: data, role_id: body.role }])
        .execute();
    }

    return res
      .status(200)
      .json({ data: created, message: ApiMessageEnum.OK, statusCode: 200 });
  } catch (e) {
    return res.status(400).json({ statusCode: 400, message: e.message });
  }
};
