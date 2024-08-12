import { Router } from 'express';
import { register, login, getAllUsersController, getUserByIdController, updateUserController, deleteUserController } from './userController';
import auth from '../../middleWare/authMiddleware';


const router = Router();

router.post('/register', register);
router.post('/login', login);
router.get('/users',auth, getAllUsersController);
router.get('/users/:id', getUserByIdController);
router.put('/users/:id', updateUserController);
router.delete('/users/:id', deleteUserController);

export const userRouter = router;
