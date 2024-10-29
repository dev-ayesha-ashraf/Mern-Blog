import express from "express";
import {verifyToken} from '../utils/vierifyUser.js'
import { create , getposts , deletepost, updatePost} from "../controllers/post.controlers.js";
const router = express.Router();

router.post('/create' , verifyToken , create);
router.get('/getposts', getposts);
router.delete('/deletepost/:postId/:userId', verifyToken, deletepost)
router.put('/updatepost/:postId/:userId', verifyToken, updatePost)

export default router;