import { User } from '../../db/entities/user.entity';
import { ApiMessageEnum, ControllerFunction } from '../models';
import { getUser } from '../user/user.helpers';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const loginLocalUser: ControllerFunction<User> = async (req, res) => {
  try {
    const { email, password } = req.body;
    const found = await getUser({ email });
    if (found) {
      if (found.status === 'active') {
        await bcrypt.compare(password, found.password, (err, result) => {
          if (result) {
            const JWTToken = jwt.sign(
              { email: found.email, _id: found.uuid },
              process.env.JWT_SECRET,
              { expiresIn: process.env.TOKEN_LIFE }
            );
            const refreshToken = jwt.sign(
              { email: found.email, _id: found.uuid },
              process.env.REFRESH_TOKEN_SECRET,
              { expiresIn: process.env.REFRESH_TOKEN_LIFE }
            );
            return res.status(200).json({
              message: ApiMessageEnum.OK,
              statusCode: 200,
              data: {
                id: found.uuid,
                role: found.roles,
                permission: found.permissions,
                name: found.fullName + ' ',
                token: JWTToken,
                refreshToken: refreshToken,
                employee: found.employee,
              },
            });
          }
          return res
            .status(401)
            .json({ message: ApiMessageEnum.ACCESS_DENIED, statusCode: 401 });
        });
      } else {
        return res
          .status(423)
          .json({
            message: ApiMessageEnum.ACCOUNT_NOT_ACTIVATED,
            statusCode: 423,
          });
      }
    } else {
      return res
        .status(404)
        .json({ message: ApiMessageEnum.NOT_FOUND, statusCode: 404 });
    }
  } catch (e) {
    return res.status(400).json({ message: e.message, statusCode: 400 });
  }
};

export const refreshTokenUser: ControllerFunction<User> = async (req, res) => {
  try {
    const { refreshToken } = req.body;
    if (refreshToken) {
      const decoded = jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET
      );
      if (decoded) {
        const user = { email: decoded['email'], _id: decoded['_id'] };
        const token = jwt.sign(user, process.env.JWT_SECRET, {
          expiresIn: process.env.TOKEN_LIFE,
        });
        return res
          .status(200)
          .json({ message: ApiMessageEnum.OK, statusCode: 200, data: token });
      } else {
        return res
          .status(403)
          .json({
            message: ApiMessageEnum.REFRESH_TOKEN_EXPIRED,
            statusCode: 403,
          });
      }
    } else {
      return res
        .status(400)
        .json({ message: ApiMessageEnum.MISSING_PARAMETER, statusCode: 400 });
    }
  } catch (e) {
    return res.status(400).json({ message: e.message, statusCode: 400 });
  }
};
