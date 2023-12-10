import { RegisterUserDto } from "../dtos/auth/register-user.dto";
import { UserEntity } from "../entities/user.entity";




//no crea instancias de la clase
export abstract class AuthDatasource {
   /* abstract login() {

    }*/

    abstract register( registerUserDto: RegisterUserDto ):Promise<UserEntity>

    //solo sirve para definir las reglas
}