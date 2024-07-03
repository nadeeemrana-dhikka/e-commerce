import exp from "constants";
import express from 'express';
import { connection } from "./database/connection";
import bodyParser from "body-parser";
import router from "./routes";

connection().then(async() =>{
    const app = express();
    app.use(express.json());
    app.use(bodyParser.urlencoded({ extended: true}));
    app.use(bodyParser.json());
    app.use("/",router);
    const port = 3002;
    app.listen(port, () =>{
        console.log(`Server is running on port ${port}`);
    });

}).catch((error) => console.log(error));