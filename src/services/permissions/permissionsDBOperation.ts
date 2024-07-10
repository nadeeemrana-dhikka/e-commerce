import { Request, Response } from "express"; // Importing Request and Response types from express
import { Permission } from "../../models/entities/permission.entity"; // Importing the Otp entity
import { AppDataSource } from "../../models/database/connection"; // Importing the data source for database connection

const permissionRepository = AppDataSource.getRepository(Permission); // Getting the repository for the Otp entity

export async function permissionInsertInDb(permission: string) {
  const newPermission = new Permission();
  newPermission.permission = permission;
  return await permissionRepository.save(newPermission);
}
export async function getallpermissions() {
  return permissionRepository.find();
}

export async function permissionUpdateInDb(id: number, permission: string) {
  const permissionToUpdate = await permissionRepository.findOneBy({ id: id });
  if (!permissionToUpdate) {
    return null;
  }
  permissionToUpdate.permission = permission;
  return await permissionRepository.save(permissionToUpdate);
}

export async function permissionDeleteInDb(id: number) {
  const permissionToDelete =  await permissionRepository.softDelete(id);
  
  if (!permissionToDelete) {
    return null;
  }
  return permissionToDelete;
}
