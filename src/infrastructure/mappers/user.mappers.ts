import { CustomError, UserEntity  } from '../../domain';



export class UserMapper {
    
    static userEntityFromObject(  object: {[key: string] :any} ) {


        const { id, _id,name, email, password, role } = object;

        if( !id || !_id ) {
            throw CustomError.badRequest('ID is missing');
        }

        if( !name ) throw CustomError.badRequest('Name is missing');
        if( !email ) throw CustomError.badRequest('Email  is missing');
        if( !password ) throw CustomError.badRequest('Email  is missing');

        return new UserEntity(
            _id || id,
            name,
            email,
            password,
            role,
        );
    }

}



