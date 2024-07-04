import express from 'express';
import { connection } from "./database/connection";
import bodyParser from "body-parser";
import rootRouter from "./routes";
import { PORT } from "./database/secrets"
import errorHandler  from './middlewares/errorHandler';
connection().then(async() =>{
    const app = express();
    app.use(express.json());
    app.use(bodyParser.urlencoded({ extended: true}));
    app.use(bodyParser.json());
    app.use("/",rootRouter);
    app.use(errorHandler);
    app.listen(PORT, () =>{
        console.log(`Server is running on port ${PORT}`);
    });

}).catch((error) => console.log(error));