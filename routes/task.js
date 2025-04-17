import express from "express";
import { deleteTask, getAllTasks, getMyTask, newTask, taskChange, updateTask } from "../controller/task.js";
import { isAuth } from "../middlewares/auth.js";

const router = express.Router();


router.get("/all",getAllTasks);

router.get("/getMyTask",isAuth,getMyTask);

router.post("/new",isAuth,newTask);

router.post("/taskChange",isAuth,taskChange)

router.route('/:id').put(isAuth,updateTask).delete(isAuth,deleteTask);

router.put("/taskUpdate/:id",isAuth,taskChange);
export default router;