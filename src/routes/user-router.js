import express from 'express';
import {addUser, deleteUser, editUser, getUserById, getUsers, login} from '../controllers/user-controller.js';

const userRouter = express.Router();

// All routes to /api/users
userRouter.route('/')
  .get(getUsers)
  .post(addUser)

// All routes to /api/users/:id
userRouter.route('/:id')
  .get(getUserById)
  .put(editUser)
  .delete(deleteUser)

userRouter.post('/login', login);

export default userRouter;
