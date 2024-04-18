import { type Request, type Response } from "express";
import _ from "lodash";
import bcrypt from "bcrypt";
import { validateUser, validateLoginUser } from "../helpers/validate";
import { TokenAUth } from "../helpers/AuthToken";
import prisma from "../prisma";

class UserController {
  static async registerUser(req: Request, res: Response) {
    const { error } = validateUser(req.body);
    if (error !== undefined) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const existingUser = await prisma.user.findUnique({
      where: { email: req.body.email },
    });

    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User with the same email already exists" });
    }

    const newUser = _.pick(req.body, [
      "firstName",
      "lastName",
      "email",
      "password",
    ]);

    const salt = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(req.body.password, salt);

    await prisma.user.create({
      data: newUser,
    });

    return res.status(201).json({ message: "User created successfully " });
  }

  static async loginUser(req: Request, res: Response) {
    const { error } = validateLoginUser(req.body);
    if (error !== undefined) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const user = await prisma.user.findUnique({
      where: { email: req.body.email },
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const token = TokenAUth.generateToken(_.pick(user, ["id", "role"]));

    return res.status(200).json({ access: token });
  }
}

export default UserController;
