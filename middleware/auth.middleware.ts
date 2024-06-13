// import dependencies

import { PrismaClient } from "@prisma/client";
import { Request, Response, NextFunction } from "express";
const jwt = require("jsonwebtoken")
const prisma = new PrismaClient();

export const authMiddleWare = (allowedRoles: string[]) => {
    return async function middleWare(
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        const header = req.header("authorization");
        const token = header ? header.split(" ")[1] : req.query.token;
        if (!token) return res.status(401).send({ message: "No Token Found" });
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
            const profile = await prisma.userRole.findFirst({
                where: {
                    id: decoded.roleId
                },

            });
            if (!profile) return res.status(401).send({ message: "Invalid Token" });
            if (!profile)
                return res
                    .status(401)
                    .send({ message: "This user don't have any role" });
            let isAllowed: boolean = false;

            if (allowedRoles.includes(profile.name)) {
                isAllowed = true;
            }

            if (!isAllowed)
                return res.status(403).json({
                    success: false,
                    message:
                        "only " +
                        allowedRoles.toString() +
                        " are allowed to access this route.",
                });
            next();
        } catch (err:any) {
            res.status(401).send({ message: ` ${err.message}`});
            console.log(err);
        }
    };
};
