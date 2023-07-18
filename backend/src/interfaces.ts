import { Request } from "express";
export interface IGetUserAuthInfoRequest extends Request {
    user: { email: string, _id: string }
}