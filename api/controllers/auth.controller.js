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
            return next(errorHandler(400, "Invalid Credentials"));
        }
        const token = jwt.sign({id: validUser._id, isAdmin: validUser.isAdmin} , process.env.JWT_SECRET_KEY, );
        const {password: pass, ...rest} = validUser._doc;
            res.status(200).cookie('access_token' , token, {
                httpOnly: true
            }).json(rest)
        
    } catch (error) {
        next(error);
    }
}
export const google = async (req, res, next) => {
    const { name, email, googlePhotoUrl } = req.body;

    try {
        const user = await User.findOne({ email });
        let token;
        let responseUser;

        if (user) {
            // User exists, generate token
            token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET_KEY);
            const { password, ...rest } = user._doc; // Exclude password from response
            responseUser = rest;
        } else {
            // New user registration
            const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
            const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
            const username = name.toLowerCase().split(' ').join('') + Math.random().toString(9).slice(-4); // Fixed case method

            const newUser = new User({
                username,
                email,
                password: hashedPassword,
                profilePicture: googlePhotoUrl || 'defaultProfilePictureUrl', // Set a default picture if needed
            });

            await newUser.save();
            token = jwt.sign({ id: newUser._id , isAdmin: newUser.isAdmin}, process.env.JWT_SECRET_KEY); // Use newUser._id for the token
            const { password, ...rest } = newUser._doc; // Exclude password from response
            responseUser = rest;
        }

        // Send response with token
        res.status(200).cookie('access_token', token, {
            httpOnly: true,
        }).json(responseUser);
        
    } catch (error) {
        next(error);
    }
};