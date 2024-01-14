import { PrismaClient,Prisma } from '@prisma/client';
import bcrypt from 'bcrypt';
import { UserRole } from "../interfaces/userRole.enum";

const prisma = new PrismaClient();

class UserModel {
  async createUser(userData: { email: string; password: string; name: string; profile?: string; role: UserRole }) {
    try {
      const {password, ...data } = userData;
      const hashedPassword = await bcrypt.hash(password, 10);
      console.log(data);

      const createdUser = await prisma.user.create({
        data: {
          ...data,
          password: hashedPassword
        }
      });

      return createdUser;
    } catch (error) { 
        if (error instanceof Prisma.PrismaClientKnownRequestError) {
        // The .code property can be accessed in a type-safe manner
        if (error.code === 'P2002') {
          throw new Error("A new user cannot be created with this email");
        }
      }
        throw new Error("Error creating user");
    }
  }

  async userLogin(data: { email: string; password: string }) {
    try {
      const { email, password } = data;
      const user = await prisma.user.findUnique({ where: { email } });
      if (user && await bcrypt.compare(password, user.password)) {
        return user;
      }
      return null;
    } catch (error) {
        throw new Error("Error during login");
    }
  }

  async findUserById(userId: number) {
    try {
      return await prisma.user.findUnique({
        where: { id: userId }
      });
    } catch (error) {
        throw new Error("Error finding user by ID");
    }
  }

  async updateUser(userId: number, updateData: { name?: string; profile?: string }, isAdmin: boolean, loggedUserId: number) {
    try {
      if (userId !== loggedUserId && !isAdmin)
        throw new Error("You are not authorized to modify this account.");

      return await prisma.user.update({
        where: { id: userId },
        data: updateData
      });
    } catch (error) {
        throw new Error("You are not authorized to delete this account.");
    }
  }

  async deleteUser(userId: number, isAdmin: boolean, loggedUserId: number) {
    try {
      if (userId !== loggedUserId && !isAdmin)
        throw new Error("You are not authorized to delete this account.");

      return await prisma.user.delete({
        where: { id: userId }
      });
    } catch (error) {
        throw new Error("Error deleting user");
    }
  }
}

export default new UserModel();
