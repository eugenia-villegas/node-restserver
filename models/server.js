import express from 'express';
import cors from 'cors';
import { router } from '../routes/user.js';
import { dbConnection } from '../database/config.js';

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT || 3000;
        this.userPath = '/api/users';

        //Connect to DB
        this.connectDB();

        //Middlewares - funciones que van a añadir otra funcionalidad a la web server
        this.middlewares();

        this.routes();

    }

    //Connect to database
    async connectDB() {
        await dbConnection();
    }


    middlewares() {
        //CORS
        this.app.use(cors())

        //Read and parse of the body
        this.app.use(express.json())

        //Public directory
        this.app.use(express.static('public'))
    }

    routes() {
        this.app.use(this.userPath, router);
          
    }

    listen() {
        this.app.listen( this.port, () => {
            console.log('Listening at http://localhost: ', this.port)
        });
    }
}

export default Server