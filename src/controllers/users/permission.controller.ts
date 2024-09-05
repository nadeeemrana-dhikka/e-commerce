import { Request, Response, NextFunction } from "express";
import {
  permissionInsertInDb,
  getallpermissions,
  permissionUpdateInDb,
  permissionDeleteInDb,
} from "../../services/users/permission.service";
import { ApiError } from "../../utility/ApiError";
import { jwtVerification } from "../../utility/jwtVerification"
import {checkIfUserIsAdmin } from '../../services/users/user.service'

export async function createPermission(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const user = await jwtVerification(req,next);
    if(!user){
      return res.status(400).json({
        "error": "Bad Request",
        "message": "Required Token is missing"
      })
    }
    console.log("user=>",user.id)
   const admin =await checkIfUserIsAdmin(user.id)
   if(!admin){
    return res.status(400).json({"message": "Only Admin can do this"})
   }
    const { permission } = req.body;
    const result = await permissionInsertInDb(permission);
    if (!result) {
      throw new ApiError(400, "Permission not save");
    }
    res.status(200).json({ message: "Permission save" });
  } catch (error) {
    next(error);
  }
}
export async function getPermissions(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try { const user = await jwtVerification(req,next);
    if(!user){
      return res.status(400).json({
        "error": "Bad Request",
        "message": "Required Token is missing"
      })
    }
    console.log("user=>",user.id)
   const admin =await checkIfUserIsAdmin(user.id)
   if(!admin){
    return res.status(400).json({"message": "Only Admin can do this"})
   }
    const result = await getallpermissions();
    if (result.length <= 0) {
      throw new ApiError(400, "Permissions are not available"); // Checking if any field is empty
    }
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

export async function updatePermission(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try { const user = await jwtVerification(req,next);
    if(!user){
      return res.status(400).json({
        "error": "Bad Request",
        "message": "Required Token is missing"
      })
    }
    console.log("user=>",user.id)
   const admin =await checkIfUserIsAdmin(user.id)
   if(!admin){
    return res.status(400).json({"message": "Only Admin can do this"})
   }
    const { permissionId, newPermission } = req.body;
    const result = await permissionUpdateInDb(permissionId, newPermission);
    if (!result) {
      throw new ApiError(400, "Permission not found");
    }
    res.status(200).json({ message: "Permission updated" });
  } catch (error) {
    next(error);
  }
}

export async function deletePermission(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try { const user = await jwtVerification(req,next);
    if(!user){
      return res.status(400).json({
        "error": "Bad Request",
        "message": "Required Token is missing"
      })
    }
    console.log("user=>",user.id)
   const admin =await checkIfUserIsAdmin(user.id)
   if(!admin){
    return res.status(400).json({"message": "Only Admin can do this"})
   }
    const { id } = req.body;
    const result = await permissionDeleteInDb(id);
    if (!result) {
      throw new ApiError(400, "Permission not found");
    }
    res.status(200).json({ message: "Permission deleted" });
  } catch (error) {
    next(error);
  }
}