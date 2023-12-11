import {Server} from './presentation/server'
import { envs } from './config';
import { AppRoutes } from './presentation/routes'
import { MongoDatabase } from './data/mongoDb';


(function(){

    main();

})()



async function main() {

    //conect to DB
    await MongoDatabase.connect({
        mongoUrl: envs.MONGO_URL,
        dbName: envs.MONGO_DB_NAME
    });
    
    new Server({
        port:envs.PORT,
        routes: AppRoutes.routes,
    })
        .start();
}

