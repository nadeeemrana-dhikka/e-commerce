import { DataSource } from "typeorm";
import { User } from "../models/entities/User"
import { Otp } from "../models/entities/Otp"

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "nadeemrana",
    password: "12345",
    database: "commerce",
    synchronize: true, // Automatically synchronize database schema with entities
    logging: false,
    entities: [User,Otp],
    migrations: [],
    subscribers: [],
});

export async function  connection(){
    return await AppDataSource.initialize()
    .then(() => {
      console.log('Data Source has been initialized!');
    })
    .catch((err) => {
      console.error('Error during Data Source initialization:', err);
    });
  }
  