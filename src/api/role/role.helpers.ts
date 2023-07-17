import { Role } from '../../db/entities/role.entity';

export const getRole = async ({ uuid }: Partial<Role> = {}) => {
  let found: Role | null = null;
  try {
    found = await Role.findOne(uuid, { relations: ['permissions'] });

    return found;
  } catch (e) {
    throw e;
  }
};
