import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { randomUUID } from "crypto";
import { userModel } from "../schemas/user";

export class AuthController {
  static async login(req: Request, res: Response) {
    const { email, password } = req.body;
    try {
      const match = await userModel.find({ email });
      if (!match[0])
        throw {
          message: "Email not found.",
        };

      const passwordMatch = await bcrypt.compare(password, match[0].password);
      if (!passwordMatch)
        throw {
          message: "The password was introduced is incorrect.",
        };
      const token = jwt.sign(
        {
          id: match[0].id,
          username: match[0].username,
        },
        "MY_SECRET_KEY",
        { expiresIn: "1 day" }
      );
      if (!token)
        throw {
          message: "An error was ocurred creating the access token.",
        };
      res.status(200).json({
        user: {
          id: match[0].id,
          username: match[0].username,
          role: match[0].role,
          token,
        },
        message: "User succesfully authenticated.",
      });
    } catch (err: any) {
      console.log(err);
      res.status(500).send({
        message: err.message,
      });
    }
  }

  static async register(req: Request, res: Response) {
    const { username, email, password, role } = req.body;
    try {
      if (!username || !email || !password || !role)
        throw {
          message: "All fields must be required.",
        };
      const hashedPassword = await bcrypt.hash(password, 10);

      if (!hashedPassword)
        throw {
          message: "An error was ocurred creating a hashed password.",
        };
      const user = new userModel({
        username,
        email,
        password: hashedPassword,
        role,
        id: randomUUID().toString(),
      });
      const newUser = await user.save();

      if (!newUser)
        throw {
          message: "An error was ocurred creating a new user.",
        };
      res.status(201).json({
        user: {
          id: newUser.id,
          username: newUser.username,
          role: newUser.role,
        },
        message: "User succesfully created.",
      });
    } catch (err: any) {
      console.log(err);
      res.status(500).send({ message: err.message });
    }
  }
}
