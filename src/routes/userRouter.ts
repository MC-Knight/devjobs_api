import express from "express";
import UserController from "../controllers/userController";

const routerUser = express();

routerUser.post("/register", UserController.registerUser);
routerUser.post("/login", UserController.loginUser);

export default routerUser;
