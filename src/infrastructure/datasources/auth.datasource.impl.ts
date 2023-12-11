import { UserModel } from "../../data/mongoDb";
import { AuthDatasource, CustomError, RegisterUserDto, UserEntity } from "../../domain";



export class AuthDatasourcesImpl implements AuthDatasource {



   async register(registerUserDto: RegisterUserDto): Promise<UserEntity> {
        
    const { name, email, password } = registerUserDto;
    try {
        // verificar que el correo exista en la DB

        const exists = await UserModel.findOne({email});

        if(exists) throw CustomError.badRequest('Email already exits');

        const user = await UserModel.create({
            name:name,
            email:email,
            password:password
        });

       await  user.save()

        // hash de la contrasena

        //Mappear la respuesta de la entidad
        
        return new UserEntity(
            '1',
            name,
            email,
            password,
            "ADMIN_ROLE"
        )

    } catch (error) {
        
        
        if(error instanceof CustomError ) {
            throw error;
        }

        throw CustomError.internalServer();

    }

    }

}
