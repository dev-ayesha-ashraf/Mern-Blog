import User from '../models/user.model.js'
import bcryptjs from 'bcryptjs'
import { errorHandler } from '../utils/error.js';
import jwt from 'jsonwebtoken'

export const signup = async (req, res, next) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password || username === '' || email === '' || password === '') {
        return next(errorHandler(400, "All Fields Are Required"));
    }
    const hashPassword = bcryptjs.hashSync(password, 10)
    try {
        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            return res.status(400).json({ error: "Username or Email Already Exists" });
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

export const signin = async(req,res,next) => {
    const {email , password} = req.body;
    if (!email || !password || email === '' || password === '') {
        return next(errorHandler(400, "All Fields Are Required"));
    }
    try {
        const validUser = await User.findOne({email});
        if(!validUser){
            return next(errorHandler(400, "User Not Found"));
        }
        const validPassword = bcryptjs.compareSync(password, validUser.password)
        if(!validPassword){
            return next(errorHandler(400, "Invalid email or Password"));
        }
        const token = jwt.sign({id: validUser._id} , process.env.JWT_SECRET_KEY, {expiresIn: '1d'});
        const {password: pass, ...rest} = validUser._doc;
            res.status(200).cookie('access_token' , token, {
                httpOnly: true
            }).json(rest)
        
    } catch (error) {
        next(error);
    }
}
