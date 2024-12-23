import User from "../models/user.model.js"
import { errorHandler } from "../utils/error.js"
import bcryptjs from 'bcryptjs'
export const test = (req, res) => {
    res.json({ message: 'API Is Working' })
}

  export const signout = (req, res, next) => {
    try {
      res
        .clearCookie('access_token')
        .status(200)
        .json('User has been signed out');
    } catch (error) {
      next(error);
    }
  };
