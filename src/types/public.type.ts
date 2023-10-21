import { ObjectId } from "mongoose";
import { IUser } from "./user.types";
import { AuthService } from "../services/auth.service";
import { RegisterDTO } from "../dtos/auth.dto";

export interface HttpError extends Error{
 status?: number
}
export type ResponseMethod = {
    statusCode: number;
    message?: string | undefined;
    data?: object | undefined
    errors?: object | undefined
}
export interface JwtToken {
    id: ObjectId,
    username: IUser['username']
}
export type FindDoc<T> = T | null | undefined

// to make clear

