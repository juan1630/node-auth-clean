import { BcryptAdapter } from "../../config";
import { UserModel } from "../../data/mongoDb";
import { AuthDatasource, CustomError, RegisterUserDto, UserEntity } from "../../domain";
import { UserMapper } from "../mappers/user.mappers";


type HashFunction = (password: string) => string;
type CompareFunction = (hashed:string, password: string) => boolean;

export class AuthDatasourcesImpl implements AuthDatasource {


    constructor(
        //Dependecnia Explicicta
        private readonly hashPassword: HashFunction = BcryptAdapter.hash,
        private readonly compareFunction: CompareFunction = BcryptAdapter.compare
    ){}

   async register(registerUserDto: RegisterUserDto): Promise<UserEntity> {
        
    const { name, email, password } = registerUserDto;
    try {
        // verificar que el correo exista en la DB

        const exists = await UserModel.findOne({email});

        if(exists) throw CustomError.badRequest('Email already exits');

        const user = await UserModel.create({
            name:name,
            email:email,
            // dependecia oculta
            password: BcryptAdapter.hash(password)
        });

       await  user.save()

        // hash de la contrasena

        //Mappear la respuesta de la entidad
        
        return  UserMapper.userEntityFromObject( user );

    } catch (error) {
        
        
        if(error instanceof CustomError ) {
            throw error;
        }

        throw CustomError.internalServer();

    }

    }

}
