import { User } from "../../models/entities/user/user.entity"; // Importing the User entity
import { AppDataSource } from "../../models/database/connection"; // Importing the data source for database connection
const userRepository = AppDataSource.getRepository(User); // Getting the repository for the User entity

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
