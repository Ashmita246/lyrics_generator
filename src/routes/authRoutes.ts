import express from 'express';
import { register, login } from '../controllers/authController';
import { authMiddleware } from '../middleware/authMiddleware';
import '../types/express'; 

const router = express.Router();

router.post('/register', register);
router.post('/login', login);


export default router;