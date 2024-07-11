import { Request, Response, NextFunction } from "express";
import {
  roleInsertInDb,
  getallroles,
  roleUpdateInDb,
  roleDeleteInDb,
} from "../../services/user/roles.services";
import { ApiError } from "../../utility/ApiError";

export async function createRole(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { role } = req.body;
    const result = await roleInsertInDb(role);
    if (!result) {
      throw new ApiError(400, "Role not save");
    }
    res.status(200).json({ message: "Role save" });
  } catch (error) {
    next(error);
  }
}
export async function getroles(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const result = await getallroles();
    if (result.length <= 0) {
      throw new ApiError(400, "Roles are not available"); // Checking if any field is empty
    }
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
}

export async function updateRole(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { roleId, newRole } = req.body;
    const result = await roleUpdateInDb(roleId, newRole);
    if (!result) {
      throw new ApiError(400, "Role not found");
    }
    res.status(200).json({ message: "Role updated" });
  } catch (error) {
    next(error);
  }
}

export async function deleteRole(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { id } = req.body;
    const result = await roleDeleteInDb(id);
    if (!result) {
      throw new ApiError(400, "Role not found");
    }
    res.status(200).json({ message: "Role deleted" });
  } catch (error) {
    next(error);
  }
}