import express from 'express';
import { test } from '../controllers/user.controller.js';
import { updateUser , signout , deleteUser } from '../controllers/user.controller.js';
import { verifyToken } from '../utils/vierifyUser.js';
const router = express.Router();
router.get('/test' , test);
router.put('/update/:userId' ,verifyToken, updateUser);
router.delete('/delete/:userId', verifyToken, deleteUser);
router.post('/signout', signout);

export default router;
