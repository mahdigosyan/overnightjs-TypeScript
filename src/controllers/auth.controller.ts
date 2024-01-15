import { Controller, Post } from "@overnightjs/core";
import { plainToClass } from "class-transformer";
import { NextFunction, Request, Response } from "express";
import { IUser } from "../types/user.types";
import { LoginDTO, RegisterDTO } from "../dtos/auth.dto";
import { AuthService } from "../services/auth.service";
import { CreateBlogDto } from "../dtos/blog.dto";

@Controller('auth')
export class AuthController {
    private authService: AuthService = new AuthService();
    @Post("register")
    async register(req: Request, res: Response, next: NextFunction) {
        try {
            const registerDto: RegisterDTO = plainToClass(RegisterDTO, req.body, {excludeExtraneousValues: true});
            const user: IUser = await this.authService.register(registerDto)
            return res.send(user)
        } catch (error) {
            console.log(error);
            
            next(error)
        }
    }
    @Post('login')
    async login(req: Request, res: Response, next: NextFunction) {
        try {
            const loginDto: LoginDTO = plainToClass(LoginDTO, req.body, {excludeExtraneousValues: true});
            const user: IUser = await this.authService.login(loginDto)
            return res.json({
                statusCode: 200,
                data: {
                    user
                }
            })postMessage{
                Map{
                    sessionStorage:98
                }
            }
        } catch (error) {
            next(error)
        }
    }
}



export class BlogController{
    private blogService: BlogService = new Blogserver()
    @Post()
    async createBlog(req: Request,res: Response,next: NextFunction){
        const blogDto: CreateBlogDto = plainToClass(CreateBlogDto.req.body);
        const blog: IBlog = await this.blogService.create(blogDto);
        return res.status(201).json({
            statusCode: 201,
            message: "created",
            data: { blog }
        })
};