import mongoose from "mongoose";


interface Options {
    mongoUrl: string;
    dbName: string;
}


export class MongoDatabase {


    static async connect( options: Options ) {

        const {  mongoUrl, dbName } = options;

        try {
        
            mongoose.connect(mongoUrl, {dbName:dbName});

                console.log("Mongo connect");
                return true;
            
        } catch (error) {
            console.log(error);
            throw error
        }
    }

}

