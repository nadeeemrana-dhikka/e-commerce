import { User } from "../../models/entities/user/user.entity"; // Importing the User entity
import { Role } from "../../models/entities/user/role.entity"; // Importing the User entity
import { Permission } from "../../models/entities/user/permission.entity";
import { AppDataSource } from "../../models/database/connection"; // Importing the data source for database connection
import exp from "constants";
const userRepository = AppDataSource.getRepository(User); // Getting the repository for the User entity

const permissionRepository = AppDataSource.getRepository(Permission);
const roleRepository = AppDataSource.getRepository(Role);
// Function to find a user by email
export async function findOneUser(email: string) {
  return await userRepository.findOne({ where: { email } }); // Querying the user repository to find a user by email
}

// Function to insert a new user into the database
export async function insertUserInDB({
  name,
  email,
  password,
  phone,
  profile,
}: any) {
  const newUser = await userRepository.create({
    name,
    email,
    password,
    phone,
    profile,
  }); // Creating a new user instance
  return await userRepository.save(newUser); // Saving the new user instance to the database
}

// Function to update the password of a user by email
export async function updatePassword(email: string, password: string) {
  const updateResult = await userRepository.update({ email }, { password }); // Updating the user's password in the database
  if (updateResult.affected === 0) {
    throw new Error("User not found"); // If no user was updated, throw an error
  }
  return updateResult;
}
export async function refreshTokenSaveInDB(
  email: string,
  refreshToken: string
) {
  const updateResult = await userRepository.update({ email }, { refreshToken }); // Updating the user's password in the database
  if (updateResult.affected === 0) {
    throw new Error("User not found"); // If no user was updated, throw an error
  }
  return updateResult;
}

export async function asignRole(userId: number, roleId: number) {
  const user = await userRepository.findOne({
    where: { id: userId },
    relations: ["roles"],
  });
  // console.log(user)
  if (!user) {
    throw new Error("User not found");
  }
  // find this role already exist or not of this user
  // Check if the user already has the role
  const roleAlreadyExist = user.roles.find((role) => role.id == roleId);
  if (roleAlreadyExist) {
    throw new Error("Role already asigned");
  }
  const role = await roleRepository.findOne({ where: { id: roleId } });
  if (!role) {
    throw new Error("Role not found");
  }
  user.roles.push(role);
  const result = await userRepository.save(user);
  if (!result) {
    throw new Error("User not found");
  }
  return result;
}

export async function asignPermission(
  roleId: number,
  permissionId: number
): Promise<void> {
  try {
    const role = await roleRepository.findOne({
      where: { id: roleId },
      relations: ["permissions"],
    });

    if (!role) {
      console.error("Role not found:", roleId);
      throw new Error("Role not found");
    }
    const permission = await permissionRepository.findOne({
      where: { id: permissionId },
    });

    if (!permission) {
      console.error("Permission not found:", permissionId);
      throw new Error("Permission not found");
    }

    const hasPermission = role.permissions.some(
      (existingPermission) => existingPermission.id === permission.id
    );
    if (hasPermission) {
      console.error("Permission is already asigned to the role:", permission);
      throw new Error("Permission is already asigned to the role");
    }

    role.permissions.push(permission);
    await roleRepository.save(role);
  } catch (error) {
    console.error("Error in asignPermissionToRole:", error);
    throw error;
  }
}

export async function unasignPermission(
  roleId: number,
  permissionId: number
): Promise<void> {
  try {
    const role = await roleRepository.findOne({
      where: { id: roleId },
      relations: ["permissions"],
    });
    if (!role) {
      console.error("Role not found:", roleId);
      throw new Error("Role not found");
    }
    const permissionExist = await roleRepository.findOne({
      where: {
        id: roleId,
        permissions: {
          id: permissionId,
        },
      },
      relations: ["permissions"],
    });
    if (!permissionExist) {
      console.error("Permission not found:", permissionId);
      throw new Error("Permission not found");
    }
    const permission = await permissionRepository.findOne({
      where: { id: permissionId },
    });

    if (!permission) {
      console.error("Permission not found:", permissionId);
      throw new Error("Permission not found");
    }

    // Filter out the permission to unasign
    role.permissions = role.permissions.filter((p) => p.id !== permission.id);

    // Save the updated role without the permission
    await roleRepository.save(role);
  } catch (error) {
    console.error("Error in unasignPermissionFromRole:", error);
    throw error;
  }
}

export async function updateUserProfileInDB({ email, name, phone, profile }: any) {
  const updateResult = await userRepository.update(
    { email },
    { name, phone, profile }
  ); // Updating the user's password in the database
  if (updateResult.affected === 0) {
    throw new Error("User not found"); // If no user was updated, throw an error
  }
  return updateResult;
}


export async function checkIfUserIsAdmin(userId: number): Promise<boolean> {
   
  // User ko load karo roles ke saath
  const user = await userRepository.findOne({
      where: { id: userId },
      relations: ["roles"]
  });

  // Agar user nahi mila to false return karo
  if (!user) {
      return false;
  }

  // Check karo agar user ka role "admin" hai
  const isAdmin = user.roles.some(role => role.role === "admin");

  return isAdmin;
}