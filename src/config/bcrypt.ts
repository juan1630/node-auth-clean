import { hashSync, compareSync } from 'bcryptjs';



//Adapter pattern, en este caso se usa para adaptar una libreria y no depender de esta

export class BcryptAdapter {

    static hash (password: string): string {

        return hashSync( password );

    }

    static compare( passwordHashed: string, passwordUser: string ) {

        return compareSync(passwordHashed, passwordUser)

    }


}


