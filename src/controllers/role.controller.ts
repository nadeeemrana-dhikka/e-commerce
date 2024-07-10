import { Request, Response, NextFunction } from "express";
import { roleInsertInDb } from '../services/Roles/rolesDBOperation'
export async function createRole(req:Request,res:Response,next:NextFunction){
    try {
        const { role } = req.body;
        const result = await roleInsertInDb(role);
        if(!result){
            res.status(400).json({message:"Role not save"})
        }
        res.status(200).json({message:"Role save"})
    } catch (error) {
        next(error)
    }
}