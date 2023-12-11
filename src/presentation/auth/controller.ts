
import { Request, Response } from "express";
import { AuthRepository, RegisterUserDto } from "../../domain";



export class AuthController {

    // dependencie injection
    constructor(
        private readonly authRepository: AuthRepository
    ) {}


    registerUser = ( req: Request, resp: Response ) =>  {
    
        const [error, registerUserDto] = RegisterUserDto.create(req.body);
        //los controladores manejan el llamando los casos de uso
        // los casos de uso llevan la logica del negocio

        if(error) return resp.status(400).json({error});

        this.authRepository.register(registerUserDto!)
        .then(user => resp.json(user))
        .catch(error => resp.status(500).json(error));


        resp.json('register user controller')
    }

    loginUser = (req: Request, resp: Response) => {
        
        const [error, registerUserDto] = RegisterUserDto.create( req.body);

        if(error) return resp.status(400).json({error});



        resp.json({registerUserDto})
    }

}


