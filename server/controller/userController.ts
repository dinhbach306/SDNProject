import { Request, Response } from "express";
import UserModel from "../models/userModel";
import bcrypt from "bcrypt";
interface User {
  name: string;
  email: string;
  password: string;
}

const bcryptSalt = bcrypt.genSaltSync(10);

const userController = {
  register: async (req: Request, res: Response) => {
    const { name, email, password }: User = req.body || {};

    try {
      if (!name || !email || !password) {
        return res.status(400).json({ message: "Invalid user data" });
      }

      const userExists = await UserModel.findOne({ email });

      if (userExists) {
        return res.status(400).json({ message: "User already exists" });
      }

      const user = await UserModel.create({
        name,
        email,
        password: bcrypt.hashSync(password, bcryptSalt),
      });

      if (user) {
        return res.status(201).json({
          _id: user._id,
          name: user.name,
          email: user.email,
        });
      } else {
        return res.status(400).json({ message: "Invalid user data" });
      }
    } catch (error: unknown) {
      return res.status(500).json(`message: ${error}`);
    }
  },
  login: async (req: Request, res: Response) => {
    const { email, password }: User = req.body || {};

    try {
      if (!email || !password) {
        return res.status(400).json({ message: "Invalid email or password" });
      }

      const user = await UserModel.findOne({ email });

      if (!user) {
        return res.status(400).json({ message: "Invalid email or password" });
      }

      const isMatch = user.password === password;
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid email or password" });
      }

      return res.status(200).json({
        _id: user._id,
        name: user.name,
        email: user.email,
      });
    } catch (error: unknown) {
      return res.status(500).json(`message: ${error}`);
    }
  },
};

export default userController;
