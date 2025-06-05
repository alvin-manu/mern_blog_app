import { User } from '../Models/userModel.js'
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"
import cloudinary from '../config/cloudinary.js';

// Register User
export const registerUser = async (req, res) => {
    // data from frontend
    const { name, email, password } = req.body;
    try {
        const extingUser = await User.findOne({ email: email })
        if (extingUser) {
            return res.status(409).json({ message: "Email Already Exists" })
        } else {
            const salt = await bcrypt.genSalt(10);
            const hashPassword = await bcrypt.hash(password, salt);
            const newUser = new User({
                name,
                email,
                password: hashPassword
            })
            await newUser.save();
            return res.status(201).json({ message: "User Registered Successfully" })
        }
    } catch (error) {
        res.status(500).json({ message: "Server Error", error })
    }
}

// Login User
export const loginUser = async (req, res) => {

    try {
        const { email, password } = req.body
        const existingUser = await User.findOne({ email: email })
        if (!existingUser) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        const hashedpassword = await bcrypt.compare(password, existingUser.password);
        if (!hashedpassword) {
            return res.status(401).json({ message: "Invalid credentials" });
        } else {
            const userInfo = {
                name: existingUser.name,
                email: existingUser.email,
                websiteLink: existingUser.websiteLink,
                role: existingUser.role,
                bio: existingUser.bio,
                avatar: existingUser.avatar,
            }
            const token = jwt.sign({ userId: existingUser._id }, process.env.JWT_TOKEN);
            return res.status(201).json({ message: "Login Successfull", jwt_token: token, userInfo: userInfo })
        }
    } catch (error) {
        res.status(500).json({ message: "Server Error", error })
    }
}

// GetUser
export const getUser = (req, res) => {
    try {
        const user = req.user;
        if (user) {
            return res.status(201).json({ message: "User Found", user })
        } else {
            return res.status(401).json({ message: "User Not Found" })
        }
    } catch (error) {
        return res.status(401).json({ message: "Server Error", error });

    }
}

export const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const userDetails = await User.find({ _id: id });
        if (userDetails) {
            return res.status(201).json({ message: "User Found", userDetails })
        } else {
            return res.status(401).json({ message: "User Not Found" })
        }
    } catch (error) {
        return res.status(401).json({ message: "Server Error", error });

    }
}



// UpdateUser
export const updateUser = async (req, res) => {
    try {
        const { name, email, bio, websiteLink } = req.body
        const user = req.user
        user.name = name
        user.email = email
        user.bio = bio
        user.websiteLink = websiteLink

        if (req.file) {
            // Upload an image
            const uploadResult = await cloudinary.uploader
                .upload(
                    req.file.path,
                    { folder: 'blog', resource_type: 'auto' }

                )
                .catch((error) => {
                    console.log(error);
                });
            user.avatar = uploadResult.secure_url
        }

        await user.save()
        return res.status(200).json({ message: "Profile updated successfully", user });

    } catch (error) {
        return res.status(401).json({ message: "Server Error", error });
    }
}

// for admin
export const getAllUsers = async (req, res) => {
    try {
        const searchTerm = req.query.search; // Get the search term
        let getAllUser;
        if (searchTerm) {
            // Search in name OR email (case insensitive)
            getAllUser = await User.find({
                $or: [
                    { name: { $regex: searchTerm, $options: 'i' } },
                    { email: { $regex: searchTerm, $options: 'i' } }
                ]
            }).select('-password');
        }else{
             getAllUser = await User.find().select('-password');
        }
        if (getAllUser) {
            return res.status(201).json({ getAllUser })
        } else {
            return res.status(401).json({ message: "Something went wrong" })
        }
    } catch (error) {
        console.log(error)
    }
}

// export const updateUserModel = async ()=>{
//     await User.updateMany(
//     { 
//         role: { $exists: false }, // Only update docs where 'role' is missing
//         isBanned: { $exists: false } // AND 'isBanned' is missing
//     },
//     { 
//         $set: { 
//             role: 'user', // Set default role
//             isBanned: false // Set default ban status
//         } 
//     }
// );
// console.log("Updated Successfully")
// }

export const banUser = async (req, res) => {
    const { id } = req.params
    try {
        console.log(req.user)
        if (req.user.role === 'admin') {
            const getUser = await User.findByIdAndUpdate(
                id,
                { isBanned: true },
                { new: true }
            );
            if (getUser) {
                res.status(200).json({ message: 'User has been banned.' });
            } else {
                return res.status(404).json({ message: 'User not found.' });
            }
        }
        else {
            return res.status(401).json({ message: "Unauthorised User" })
        }

    } catch (error) {
        console.log(error)
    }
}


export const unbanUser = async (req, res) => {
    const { id } = req.params
    try {
        console.log(req.user)
        if (req.user.role === 'admin') {
            const getUser = await User.findByIdAndUpdate(
                id,
                { isBanned: false },
                { new: true }
            );
            if (getUser) {
                res.status(200).json({ message: 'User has been Unbanned.' });
            } else {
                return res.status(404).json({ message: 'User not found.' });
            }
        }
        else {
            return res.status(401).json({ message: "Unauthorised User" })
        }

    } catch (error) {
        console.log(error)
    }
}