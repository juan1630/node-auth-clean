import 'dotenv/config';
import { get } from 'env-var';


export const envs = {
    PORT: get('PORT').required().asPortNumber(),
}

//modificar los paquetes de terceros, al proyecto y no nuestro proyecto a las paquetes



