import { Request, Response } from 'express';
import UserModel from '../models/user.model';
import jwt from 'jsonwebtoken';
import { User } from '@prisma/client';
import { CreateUserSchema } from '../DTOs/user.dto';
import { LoginUserSchema } from '../DTOs/user.dto';
import { fromZodError } from "zod-validation-error"

if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET environment variable not set');
}
const JWT_SECRET = process.env.JWT_SECRET;
class UserController {
    async signUp(req: Request, res: Response) {
        try {
            const validateUser = CreateUserSchema.safeParse(req.body);
            if (validateUser.success) {
                const user = await UserModel.createUser(validateUser.data);
                console.log(user.id);
                
                const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });
                res.status(201).json({ token,user:{id:user.id, name:user.name}} );
            }
            else {
                res.send(fromZodError(validateUser.error).message)
            }
        } catch (error) {
            res.status(400).json({ message: (error as Error).message });
        }
    }

    async login(req: Request, res: Response) {
        try {
            const validateUser = LoginUserSchema.safeParse(req.body);
            // if (validateUser.success) {
            //     const user = await UserModel.userLogin(validateUser.data);
            if (1) {
                const user = await UserModel.userLogin(req.body);
                if (user) {
                    const token = jwt.sign({ id: user.id, email: user.email, roles: user.role }, JWT_SECRET, { expiresIn: '1h' });
                    res.status(201).json({ token,user:{id:user.id, name:user.name}} );
                } else {
                    res.status(401).json({ message: 'Invalid credentials' });
                }
            }
            else {
                // res.send(fromZodError(validateUser.error).message)lll
                res.send("error")
            }
        } catch (error) {
            res.status(500).json({ message: (error as Error).message });
        }

    }

    async getUserById(req: Request, res: Response) {
        try {
            const user = await UserModel.findUserById(parseInt(req.params.userId));
            if (user) {
                const reply = {
                    name: user.name,
                    profile: user.profile
                }
                res.json(reply);
            } else {
                res.status(404).json({ message: 'User not found' });
            }
        } catch (error) {
            res.status(500).json({ message: (error as Error).message });
        }
    }

    async updateUser(req: Request, res: Response) {
        try {
            const loggedUser = req.user as User;
            const loggedUserId = loggedUser.id
            const isAdmin = loggedUser.role.includes("ADMIN");
            const user = await UserModel.updateUser(parseInt(req.params.userId), req.body, isAdmin, loggedUserId);
            res.json(user);
        } catch (error) {
            res.status(500).json({ message: (error as Error).message });
        }
    }

    async deleteUser(req: Request, res: Response) {
        try {
            const loggedUser = req.user as User;
            const isAdmin = loggedUser.role.includes("ADMIN");
            const loggedUserId = loggedUser.id
            await UserModel.deleteUser(parseInt(req.params.userId), isAdmin, loggedUserId);
            res.status(204).send("user deleted successfully");
        } catch (error) {
            res.status(500).json({ message: (error as Error).message });
        }
    }

    // Additional methods can be added as needed.
}

export default new UserController();
