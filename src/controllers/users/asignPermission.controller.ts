import { Request, Response, NextFunction } from "express";
import {
  asignPermission,
  asignRole,unasignPermission
} from "../../services/users/user.service";
import { ApiError } from "../../utility/ApiError";

export async function asignRoleToUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { userId, roleId } = req.body;
    const roleResult = await asignRole(userId, roleId);
    res.status(200).json(roleResult);
  } catch (error) {
    next(error);
  }
}

export async function asignPermissionToRole(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { roleId, permissionId } = req.body;
    await asignPermission(roleId, permissionId);
    res
      .status(200)
      .json({ message: "Permission asigned to role successfully" });
  } catch (error) {
    console.error("Error in asignPermissionToRole:", error);
    next(error);
  }
}

export async function unasignPermissionFromRole(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { roleId, permissionId } = req.body;
    await unasignPermission(roleId, permissionId);
    res
      .status(200)
      .json({ message: "Permission unasigned from role successfully" });
  } catch (error) {
    console.error("Error in unasignPermissionFromRole:", error);
    next(error);
  }
}
