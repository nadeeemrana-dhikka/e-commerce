import { DataSource, Migration } from "typeorm"; // Importing DataSource from TypeORM
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
  migrations: ["src/migration/**/*.ts"],// Migrations 
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

// Migration create and run migration

// typeorm migration:create src/migration/UserMigration

// run migration
// ts-node -r tsconfig-paths/register ./node_modules/typeorm/cli.js migration:run -d src/models/database/connection.ts

// revert migration
// ts-node -r tsconfig-paths/register ./node_modules/typeorm/cli.js migration:revert -d src/models/database/connection.ts
