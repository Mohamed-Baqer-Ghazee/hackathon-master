// roleAuthorization.ts

import { Request, Response, NextFunction } from 'express';
import { IUser } from '../interfaces/user.interface';
import { UserRole } from '@prisma/client';

export const roleAuth = (requiredRole: UserRole) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const user = req.user as IUser;
        if (user &&  user.role == requiredRole) {
            next();
        } else {
            res.status(403).send('Access Denied');
        }
    };
};