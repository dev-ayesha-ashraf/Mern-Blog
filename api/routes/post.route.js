import express from "express";
import {verifyToken} from '../utils/vierifyUser.js'
import { create } from "../controllers/post.controlers.js";
const router = express.Router();

router.post('/create' , verifyToken , create)

export default router;