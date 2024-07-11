import { Request, Response, NextFunction } from "express";
import {
    serchRole,

} from "../../services/user/roles.services";
import { searchPermission } from '../../services/user/permission.services'
import { ApiError } from "../../utility/ApiError";
import { roleAndPermissionInsertInDb } from '../services/userHasPermission/userHasPermissionDBOperation'
export async function asignPermission(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { roleId, permissionId } = req.body;
    const result = await serchRole(roleId);
    if (!result) {
      throw new ApiError(400, "Role not Found");
    }
    const permissionResult = await searchPermission(permissionId);
    if (!permissionResult) {
      throw new ApiError(400, "Permission not Found");
    }
    const userHaspermissionResult = await roleAndPermissionInsertInDb(roleId,permissionId)
    if (!userHaspermissionResult) {
      throw new ApiError(400, "Permission not Found");
      }
    res.status(200).json({ message: "Permission save" });
  } catch (error) {
    next(error);
  }
}