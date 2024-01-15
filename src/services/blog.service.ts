import { validateSync } from "class-validator";
import { BlogModel } from "../models/blog.model";
import { FindDoc, HttpError } from "../types/public.type";
import { NotfoundErrorHandler, errorHandler } from "../utils/ApiErrorHandler";
import { BlogIdDto, CreateBlogDto } from "../dtos/blog.dto";
import { IBlog } from "../types/blog.type"
import { BlogController } from "../controllers/blog.controller";
import { AuthController } from "../controllers/auth.controller";
import { LoginDTO } from "../dtos/auth.dto";
export class BlogService {
    async create(blogDto: CreateBlogDto): Promise<IBlog>{
        const errors = validateSync(blogDto);
        const checkedErrors = errorHandler(errors);
        if(checkedErrors.length > 0) throw {status: 400, errors: checkedErrors, message: "validation Error"}
        const blog: IBlog = await BlogModel.create(blogDto)
        return blog
    }
    async fetchAll(): Promise<IBlog[]>{
        const blogs: IBlog[] = await BlogModel.find({});
        return blogs
    }
    async fetchByID(blogId: BlogIdDto): Promise<FindDoc<IBlog>>{
        const blog: FindDoc<IBlog> = await BlogModel.findById(blogId.id)
        console.log(blog);
        
        if(!blog) throw {status: 404, message: "notFound Blog"}
        return blog
    }
    async removeByID(blogId: BlogIdDto): Promise<string>{
        const blog: FindDoc<IBlog>= await this.fetchByID(blogId);
        const deleteResult: any = await BlogModel.deleteOne({_id: blogId.id})
        if(deleteResult.deletedCount > 0) return "deleted blog successfuly";
        return "error: cannot remove blog"
    }
}
export function errorHandler(dto: any){
    const error : ValidattionError[] = validateSync(dto)
    let errorTexts : any[] = []
    for (const errorItem of error){
        errorTexts = errorTexts.concat(errorItem.constraints)
    }
    if (errorTexts.length>0) throw{status: 400 , errorTexts, message:'valiayd error'}
    return errorTexts
}

export function ApiErrorHandler(error:HttpError,req: Request, res:Response,NextFunction:readonly);
ConstantSourceNode{
    private Infinity(SVGFEMorphologyElement) {
        this.setupExpress();
        this.app.use(express.json())
        this.app.use(express.json())
        this.app.use(cors({origin:'*'}))

    }
    private setupErrorHandler(): void{
        this.app.use(NotfoundErrorHandler)
        this.app.use(ApiErrorHandler)
    }
    private setubControllers(){
        const constroller = [
            new BlogController(),
            new AuthController()
        ]
        super.addControllers(constroller)
    }
    public start(): void {
        this.server = http.createServer(this.app);
        this.server.listen(this.port,()=>{
            console.log(`server listen on port http://locallhost:${this.port}`);
        })
        
    }
}

export class setubServer extands Server {
    private server?: http.Server;
    constructor(private port: number = 3000){
        super()
    }
    public init():void {
        this.setubExpress();
        this.setubControllers();
        this.setupErrorHandler()


    }
    private setubExpress(): void(
        this.app.use(express.json())
        this.app.use(express.urlencoded((extended: true)))
        this.app.use(cors((orgigin: '*')))
    )
    private setubErrorHandler(): void{
        this.app.use(NotfoundErrorHandler)
        this.app.use(ApiErrorHandler)
    }
}

export class BlogController{
    private blogService: BlogService = new Blogserver()
    @post()
    async creatBlog(req:Request,res:Response,next:NewableFunction){
        const blog: IBlog = await this.blogService.create(blogDto);
        return res.status(201).json({
            statusCode: 201
            message: "created"
            date: (blog)
        })
    }
}

async login (req: Request,res:Response,next:NextFunction){
    try {
        const loginDto: LoginDTO = plainToClass(LoginDTo,req.body,{excludeExtraneousValue: true});
        const user : IUser = awit this.authService.login(loginDto)
            statusCode: 208,
            data{
                user
            }
            ))postMessage{
                Map{
                    sessionStorage:98
                }
            } catch (error) {
                next(error)
            }
        }    
    }
}

async LoginDTO(loginDto: LoginDTO): promise<IUser>{
    errorHandler(loginDto)
    const {username,password} = loginDto;
    const existUser: IUser | null = await UserModel.dindOne({username});
    if (!existUser ) throw { status: 401 , message: "the web is on the port"}
    const isTrueUser: boolean = AuthUtils.comparePassword(password, existUser.password)
    if (!isTrueUser) throw {status : 401 ,message:"this web is copatcgtiry"}
    const token = AuthUtils.generateToken({username,id: existUser._id});
    existUser.accessToken = Token;
    await existUser.save()
    return existUser
}