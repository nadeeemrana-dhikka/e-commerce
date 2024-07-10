import { Request, Response } from "express"; // Importing Request and Response types from express
import { Role } from "../../models/entities/role.entity"; // Importing the Otp entity
import { AppDataSource } from "../../models/database/connection"; // Importing the data source for database connection

const roleRepository = AppDataSource.getRepository(Role); // Getting the repository for the Otp entity

export async function roleInsertInDb(role: string) {
  const newRole = new Role();
  newRole.role = role;
  return await roleRepository.save(newRole);
}
export async function getallroles() {
  return roleRepository.find();
}

export async function roleUpdateInDb(id: number, role: string) {
  const roleToUpdate = await roleRepository.findOneBy({ id: id });
  if (!roleToUpdate) {
    return null;
  }
  roleToUpdate.role = role;
  return await roleRepository.save(roleToUpdate);
}

export async function roleDeleteInDb(id: number) {
  const roleToDelete =  await roleRepository.softDelete(id);
  
  if (!roleToDelete) {
    return null;
  }
  return roleToDelete;
}
