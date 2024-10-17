import User from '../models/user.model.js'
import bcryptjs from 'bcryptjs'
import { errorHandler } from '../utils/error.js';

export const signup = async (req, res, next) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password || username === '' || email === '' || password === '') {
     next(errorHandler(400, "All Fields Are Required"))
    }
    const hashPassword = bcryptjs.hashSync(password, 10)
    try {
        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            next(errorHandler(400, "Username or Email Already Exists"))
        }
        const newUser = new User({
            username,
            email,
            password: hashPassword,
        });
        await newUser.save();
        res.json("Signup Successful");
    } catch (error) {
        next(error)
    }
}
