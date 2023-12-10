import express, { Router } from 'express'


// agregar el .env aca hara que sea una dependencia oculta
// para evitar eso, haremos que la dependencia sea implicita


//creamos la interfaz, ya que se esperan mas de 3 argumentos
interface Options {
    port: number;
    routes: Router
}



export class Server {

    public readonly app = express();

    private readonly  port : number;
    private readonly  routes: Router;


    constructor( options: Options ){
       
        const { port, routes } = options;

        this.port = port;
        this.routes = routes;
    }
    
    async start(){

        //middlewares
        this.app.use( express.json());
        this.app.use( express.urlencoded({extended: true})); //x-www-urlEncode

        //Usar las rutas definidas
        this.app.use( this.routes );
        
        
        //Escuchar por el puerto
        this.app.listen(3000, () => {
            console.log(` Server running on port  ${ this.port}`);
        });
    }
}



