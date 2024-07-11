import { Request, Response, NextFunction } from "express";
import {
  assignPermission,
  assignRole,unassignPermission
} from "../../services/user/user.services";
import { ApiError } from "../../utility/ApiError";

export async function assignRoleToUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { userId, roleId } = req.body;
    const roleResult = await assignRole(userId, roleId);
    res.status(200).json(roleResult);
  } catch (error) {
    next(error);
  }
}

export async function assignPermissionToRole(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { roleId, permissionId } = req.body;
    await assignPermission(roleId, permissionId);
    res
      .status(200)
      .json({ message: "Permission assigned to role successfully" });
  } catch (error) {
    console.error("Error in assignPermissionToRole:", error);
    next(error);
  }
}

export async function unassignPermissionFromRole(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { roleId, permissionId } = req.body;
    await unassignPermission(roleId, permissionId);
    res
      .status(200)
      .json({ message: "Permission unassigned from role successfully" });
  } catch (error) {
    console.error("Error in unassignPermissionFromRole:", error);
    next(error);
  }
}
