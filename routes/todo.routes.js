import {Router} from "express";
import {GetAllTodos , CreateTodo , UpdateTodo , DeleteTodo ,GetTodo} from "../controllers/todo.controllers.js";
import authorize from "../middlewares/auth.middlewares.js";
// import  {VerifyTodo} from "../utils/verify.js";

const TodoRouter = Router();

TodoRouter.get("/" ,authorize, GetAllTodos)
TodoRouter.get("/:id" ,authorize,GetTodo)

TodoRouter.post("/",authorize , CreateTodo)
TodoRouter.put("/:id",authorize , UpdateTodo)
TodoRouter.patch("/:id" ,authorize, UpdateTodo)

TodoRouter.delete("/:id",authorize , DeleteTodo)

export default TodoRouter ;