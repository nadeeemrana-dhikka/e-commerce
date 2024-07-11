import { DataSource } from "typeorm"; // Importing DataSource from TypeORM
import { User } from "../entities/user/user.entity"; // Importing the User entity
import { Otp } from "../entities/user/otp.entity"; // Importing the Otp entity
import { Role } from "../entities/user/role.entity";
import { Permission } from "../entities/user/permission.entity";
// Creating a new DataSource instance with configuration options
export const AppDataSource = new DataSource({
  type: "mysql", // Type of database
  host: "localhost", // Database host
  port: 3306, // Database port
  username: "nadeemrana", // Database username
  password: "12345", // Database password
  database: "commerce", // Database name
  synchronize: true, // Automatically synchronize database schema with entities
  logging: false, // Disable logging
  entities: [User, Otp, Role, Permission], // Entities to be included in the data source
  migrations: [], // Migrations (none in this case)
  subscribers: [], // Subscribers (none in this case)
});

// Function to initialize the data source connection
export async function connection() {
  return await AppDataSource.initialize() // Initializing the data source
    .then(() => {
      console.log('Data Source has been initialized!'); // Logging success message
    })
    .catch((err) => {
      console.error('Error during Data Source initialization:', err); // Logging error message
    });
}
