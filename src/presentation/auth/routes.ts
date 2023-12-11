import { Router } from 'express';
import { AuthController }  from './controller';
import { AuthDatasourcesImpl, AuthRepositoryImpl } from '../../infrastructure';



export class AuthRoutes {


    static get routes(): Router {

        const router = Router();


        const dataSource = new AuthDatasourcesImpl();
        const authRepository = new AuthRepositoryImpl(dataSource);
        const controller = new AuthController( authRepository );

        // Definir las rutas principales
        router.post('/login',  controller.loginUser );
        router.post('/register', controller.registerUser);

        return router;
    }


}



