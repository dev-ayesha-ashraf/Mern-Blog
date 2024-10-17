import User from '../models/user.model.js'
import bcryptjs from 'bcryptjs'

export const signup = async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password || username === '' || email === '' || password === '') {
        return res.status(400).json({ message: 'All Fields Are Required' });
    }
const hashPassword = bcryptjs.hashSync(password, 10)
    try {
        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            return res.status(400).json({ message: 'Username or Email already exists' });
        }
        const newUser = new User({
            username,
            email,
            password: hashPassword,
        });
        await newUser.save();
        res.json("Signup Successful");
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}
