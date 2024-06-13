import { Request, Response } from "express";
import { loginUser } from "../services/auth.service";
import ApiResponse from "../utils/ApiResponse.util"

export const handleLogin = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const data = await loginUser({ email, password });
        return res.status(200).json(
            ApiResponse.success(
                "User logged in successfully", data
            )
        )


    }
    catch (err) {
        return res.status(500).json(ApiResponse.error("Login failed", (err as any).message))

}
}
