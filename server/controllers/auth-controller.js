import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../models/User.js';

export const signup = async (req, res) => {
    try {
        const { email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ msg: 'Email already exists' });
        }

        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new User({
            email: email,
            password: hashedPassword,
        })
        const savedUser = await newUser.save();
        return res.status(201).json({ msg: "User has been successfully registered" })
    }
    catch (error) {
        res.status(500).json(error);
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(400).json({ msg: "Email does not exist." });
        }
        const matchPass = await bcrypt.compare(password, user.password);
        if (!matchPass) {
            return res.status(400).json({ msg: "Invalid password. Please try again." });
        }

        const accessToken = jwt.sign({ id: user._id }, process.env.ACCESS_KEY, { expiresIn: '30m' });
        const refreshToken = jwt.sign({ id: user._id }, process.env.REFRESH_KEY, { expiresIn: '90d' });
        delete user.password;
        return res.status(200).json({ accessToken, refreshToken });
    } catch (error) {
        res.status(500).json(error);
    }
}

export const refresh = async (req, res) => {
    try {
        const refreshToken = req.headers.authorization?.split(" ")[1];

        if (!refreshToken) {
            return res.status(401).json({ message: "Refresh token is missing" });
        }
        jwt.verify(refreshToken, process.env.REFRESH_KEY, async (err, decoded) => {
            if (err) {
                return res.status(403).json({ message: "Invalid refresh token" });
            }
            console.log(decoded);
            const user = await User.findById(decoded.id);

            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            const accessToken = jwt.sign(
                { id: user._id },
                process.env.ACCESS_KEY,
                { expiresIn: "30m" }
            );
            console.log(req.user)

            return res.status(200).json({ accessToken, refreshToken });
        });
    } catch (error) {
        res.status(500).json(error);
    }
}