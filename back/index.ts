import cors from "cors";
import express from "express";
import { CreateAdminController } from "./controllers/Admin/CreateAdminController";
import { GetAdminController } from "./controllers/Admin/GetAdminController";
import { LoginController } from "./controllers/Login/LoginController";
import { verifyToken } from "./controllers/Token/VerifyToken";
import { CreateUserController } from "./controllers/Users/CreateUserController";
import { DeleteUserController } from "./controllers/Users/DeleteUserController";
import { GetUsersController } from "./controllers/Users/GetUsersController";
import { UpdateUserController } from "./controllers/Users/UpdateUserController";
import { verifyTokenMiddleware } from "./middleware/auth";

const app = express();

app.use(cors());
app.use(express.json());

const createAdminController = new CreateAdminController();
const getAdminController = new GetAdminController();

const loginController = new LoginController();

const getUsersController = new GetUsersController();
const createUserController = new CreateUserController();
const updateUserController = new UpdateUserController();
const deleteUserController = new DeleteUserController();

app.get("/admin", getAdminController.handle);
app.post("/admin", createAdminController.handle);

app.post("/login", loginController.handle);

app.get("/users", getUsersController.handle);

app.post("/verify-token", verifyToken);

app.post("/user", verifyTokenMiddleware, createUserController.handle);
app.put("/user", verifyTokenMiddleware, updateUserController.handle);
app.delete("/user", verifyTokenMiddleware, deleteUserController.handle);

app.listen(4000, () => {
  console.log("Server on 4000");
});
