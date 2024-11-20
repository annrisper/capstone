import {Router} from 'express'
import { register, login, getAllUsers, deleteUser } from '../contollers/Controller'
import { validateRegistration, validateLogin } from '../middlewares/validators';
import { authenticateToken } from '../middlewares/auths';

const router = Router();


router.post('/register', validateRegistration, register);
router.post('/login', validateLogin, login);
router.get('/getUsers', getAllUsers);
router.post('/deleteUser/:id', authenticateToken, deleteUser);






export default router