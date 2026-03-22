import { Request, Response } from "express";
import { signupUser, loginUser } from "../services/authService";

export async function signup(req: Request, res: Response) {
  try {
    const { name, email, password } = req.body;

    const user = await signupUser(name, email, password);

    res.json({
      message: "Account created successfully.",
      user: {
        id: user.id,
        email: user.email
      }
    });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
}

export async function login(req: Request, res: Response) {
  try {
    const { email, password } = req.body;

    const data = await loginUser(email, password);

    res.json(data);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
}