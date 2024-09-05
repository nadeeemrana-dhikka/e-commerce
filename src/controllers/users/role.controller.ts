import { Request, Response, NextFunction } from "express";
import {
  roleInsertInDb,
  getallroles,
  roleUpdateInDb,
  roleDeleteInDb,
} from "../../services/users/roles.service";
import { ApiError } from "../../utility/ApiError";
import { checkIfUserIsAdmin } from '../../services/users/user.service'
import { jwtVerification } from "../../utility/jwtVerification"

export async function createRole(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const user = await jwtVerification(req, next);
    if (!user) {
      return res.status(400).json({
        "error": "Bad Request",
        "message": "Required Token is missing"
      })
    }
    console.log("user=>", user.id)
    const admin = await checkIfUserIsAdmin(user.id)
    if (!admin) {
      return res.status(400).json({ "message": "Only Admin can do this" })
    }
    const { role } = req.body;
    const result = await roleInsertInDb(role);
    if (!result) {
      throw new ApiError(400, "Role already exist");
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
    const user = await jwtVerification(req, next);
    if (!user) {
      return res.status(400).json({
        "error": "Bad Request",
        "message": "Required Token is missing"
      })
    }
    console.log("user=>", user.id)
    const admin = await checkIfUserIsAdmin(user.id)
    if (!admin) {
      return res.status(400).json({ "message": "Only Admin can do this" })
    }
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
    const user = await jwtVerification(req, next);
    if (!user) {
      return res.status(400).json({
        "error": "Bad Request",
        "message": "Required Token is missing"
      })
    }
    console.log("user=>", user.id)
    const admin = await checkIfUserIsAdmin(user.id)
    if (!admin) {
      return res.status(400).json({ "message": "Only Admin can do this" })
    }
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
    const user = await jwtVerification(req, next);
    if (!user) {
      return res.status(400).json({
        "error": "Bad Request",
        "message": "Required Token is missing"
      })
    }
    console.log("user=>", user.id)
    const admin = await checkIfUserIsAdmin(user.id)
    if (!admin) {
      return res.status(400).json({ "message": "Only Admin can do this" })
    }
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