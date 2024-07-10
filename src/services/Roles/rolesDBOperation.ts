import { Request, Response } from "express"; // Importing Request and Response types from express
import { Role } from "../../models/entities/role.entity"; // Importing the Otp entity
import { AppDataSource } from "../../models/database/connection"; // Importing the data source for database connection

const roleRepository = AppDataSource.getRepository(Role); // Getting the repository for the Otp entity

export async function roleInsertInDb(role:string){
    const newRole = new Role()
    newRole.role = role;
    return  await roleRepository.save(newRole);
}