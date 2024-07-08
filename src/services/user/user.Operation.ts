import { Request, Response, NextFunction } from "express";
import { User } from "../../models/entities/User";
import { AppDataSource } from "../../models/database/connection";
const userRepository = AppDataSource.getRepository(User);

export async function findOneUser(email:string){
   return await userRepository.findOne({ where: { email } });
}

export async function insertUserInDB({
    name,
    email,
    password,
    phone,
    profile,
  }:any) {
    const newUser = await userRepository.create({
        name,
        email,
        password,
        phone,
        profile,
      });
      return await userRepository.save(newUser);
}