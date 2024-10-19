import express from 'express';
import { test } from '../controllers/user.controller.js';
import { updateUser } from '../controllers/user.controller.js';
import { verifyToken } from '../utils/vierifyUser.js';
import {deleteUser} from '../controllers/user.controller.js'
const router = express.Router();
router.get('/test' , test);
router.put('/update/:userId' ,verifyToken, updateUser);
router.put('/delete/:userId' ,verifyToken, deleteUser);

export default router;
