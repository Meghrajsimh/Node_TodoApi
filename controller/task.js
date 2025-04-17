import { ErrorHandler } from "../middlewares/error.js";
import { taskModel } from "../models/TaskModel.js";
export const getAllTasks = async(req,res, next) => {

   try {
    const allTask = await taskModel.find();
   res.status(200).json({
    success:true,
    Data: allTask
   })
   } catch (error) {
    next(error);
   }
}

export const getMyTask = async(req, res, next) => {
   try {
    const userId = req.userData._id;
    
    const myTasks = await taskModel.find({user:userId});
    if(!myTasks) return next(new Error('No Task'))
    res.status(201).json({
        success:true,
        Data: myTasks
    })
   } catch (error) {
    next(error);
   }
}
export const newTask = async (req, res, next) => {
   try {
    const { title, des } = req.body;

    if (!title || !des) {
        return next(new ErrorHandler("Please fill in all fields", 404)); 
    }

    await taskModel.create({
        title, des, user: req.userData
    });

    res.status(201).json({
        success: true,
        message: "Task created successfully"
    });
   } catch (error) {
    next(error)
   }
};


export const updateTask = async(req,res,next) => {
  

 try {
    const userTask = await taskModel.findById(req.params.id);

    userTask.isComplelet = !userTask.isComplelet;
    await userTask.save();
    res.status(200).json({
     success:true,
     message: "Task updated successfully"
    })
 } catch (error) {
    next(error)
 }
}



export const deleteTask = async(req,res, next) => {
   try {
    const userTask = await taskModel.findById(req.params.id);
    if(!userTask) return next(new ErrorHandler("Please fill in all fields", 404))

     if(req.userData._id.toString() !== userTask.toString()) return  next(new ErrorHandler("Unauthorized to delete this task", 403));

    await userTask.deleteOne();
    res.status(200).json({
        success:true,
        message: "Task deleted successfully"
    })

   } catch (error) {
    next(error)
   }
}


export const taskChange = async(req, res, next) => {

  try {
    const {title, des} = req.body;
    const  task = await taskModel.findById(req.params.id);
    if(!task) return next(new ErrorHandler("Please fill in all fields", 404));

    if(title !== task.title) {
        task.title = title;
    }
    if(des !== task.des) {
        task.des = des;
    }

    await task.save();
    res.status(200).json({
        success:true,
        message: "Task updated successfully"
    })
  } catch (error) {
    next(error)
  }

}
