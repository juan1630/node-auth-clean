
import { Request, Response } from "express";
import { RegisterUserDto } from "../../domain";



export class AuthController {

    // dependencie injection
    constructor() {}


    registerUser = ( req: Request, resp: Response ) =>  {
    
        //los controladores manejan el llamando los casos de uso
        // los casos de uso llevan la logica del negocio
        resp.json('register user controller')
    }

    loginUser = (req: Request, resp: Response) => {
        
        const [error, registerUserDto] = RegisterUserDto.create( req.body);

        if(error) return resp.status(400).json({error});



        resp.json({registerUserDto})
    }

}


