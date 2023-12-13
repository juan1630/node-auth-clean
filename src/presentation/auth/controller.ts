
import { Request, Response } from "express";
import { AuthRepository, CustomError, RegisterUserDto } from "../../domain";
import { JwtAdapter } from "../../config";



export class AuthController {

    // dependencie injection
    constructor(
        private readonly authRepository: AuthRepository
    ) {}


    private handleError = ( error:unknown, response: Response ) => {
        
        if( error instanceof CustomError ) {
            return response.status( error.statusCode ).json({error: error.message});
        }

        //Se podria grabar el error en winston
        console.log(error);
        return response.status(500).json({error: 'Internal Server Error'})
    }


    registerUser = ( req: Request, resp: Response ) =>  {
    
        const [error, registerUserDto] = RegisterUserDto.create(req.body);
        //los controladores manejan el llamando los casos de uso
        // los casos de uso llevan la logica del negocio

        if(error) return resp.status(400).json({error});

        this.authRepository.register(registerUserDto!)
        .then( async (user) => {
            resp.json({ user, token: await JwtAdapter.generateJwt( user, '8h' ) })
        })
        .catch(error => this.handleError(error, resp));
    }

    loginUser = (req: Request, resp: Response) => {
        
        const [error, registerUserDto] = RegisterUserDto.create( req.body);

        if(error) return resp.status(400).json({error});



        resp.json({registerUserDto})
    }

}


