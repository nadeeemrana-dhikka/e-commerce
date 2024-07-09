import express from 'express'; // Importing Express framework
import { connection } from "./models/database/connection"; // Importing database connection function
import bodyParser from "body-parser"; // Importing body-parser for parsing request bodies
import rootRouter from "./routes"; // Importing root router
import { PORT } from "./models/database/secrets"; // Importing port from secrets file
import errorHandler from './middlewares/errorHandler'; // Importing error handler middleware

connection().then(async () => { // Connecting to the database
    const app = express(); // Creating an Express application instance
    app.use(express.json()); // Parsing JSON bodies
    app.use(bodyParser.urlencoded({ extended: true })); // Parsing URL-encoded bodies
    app.use(bodyParser.json()); // Parsing JSON bodies
    app.use("/", rootRouter); // Mounting root router at the root endpoint
    app.use(errorHandler); // Using error handler middleware

    app.listen(PORT, () => { // Starting the server
        console.log(`Server is running on port ${PORT}`); // Logging server startup message
    });

}).catch((error) => console.log(error)); // Catching and logging any connection errors
