import { User } from '../../db/entities/user.entity';
import { getConnection } from 'typeorm';

export const getUser = async ({ email, uuid }: Partial<User> = {}) => {
  let found: User | null = null;
  try {
    switch (true) {
      case !!uuid:
        found = await User.findOne(uuid, {
          relations: ['employee', 'roles', 'permissions'],
        });
        break;
      case !!email:
        found = await User.getUserByEmail(email);
    }

    return found;
  } catch (e) {
    throw e;
  }
};

export const createUserRoles = async (userId: any, roles: any) => {
  if(roles=== undefined)
  {
  }
  else if (roles.length) {
    await getConnection()
      .createQueryBuilder()
      .delete()
      .from('user_has_roles')
      .where('user_id = :id', { id: userId })
      .execute();
    for (let data of roles) {
      const created = await getConnection()
        .createQueryBuilder()
        .insert()
        .into('user_has_roles')
        .values([{ role_id: data, user_id: userId }])
        .execute();
    }
  }
};

export const createUserPermissions = async (userId: any, permissions: any) => {
  if(permissions=== undefined)
  {
  }
   else if (permissions.length) {
    await getConnection()
      .createQueryBuilder()
      .delete()
      .from('user_has_permissions')
      .where('user_id = :id', { id: userId })
      .execute();
    for (let data of permissions) {
      const created = await getConnection()
        .createQueryBuilder()
        .insert()
        .into('user_has_permissions')
        .values([{ permission_id: data, user_id: userId }])
        .execute();
    }
  }
};
