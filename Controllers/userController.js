const User = require('../Models/userModel')

const register = async (req, res) => {
    try {
        const existingUser = await User.find({ email: req.body.email });
        if (existingUser.length) {
            res.json({ message: "user Already exist" });
            return
        }
        const user = await User.create({
            email: req.body.email,
            password: req.body.password,
            profilePicture: req.body.profilePicture
        })
        res.status(201).json({
            message: "Registered",
            user
        })
    } catch (e) {
        console.log(e)
    }
}
const login = async (req, res) => {
    try {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
        res.setHeader('Access-Control-Allow-Credentials', true);
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, OPTIONS, DELETE');
        if (req.method === 'OPTIONS') {
            return res.status(200).json(({
                body: "OK"
            }))
        }
        const existingUser = await User.findOne({ email: req.body.email });
        if (!existingUser) {
            res.json({ message: "user doesn't exist" });
            return
        }
        // console.log("hello")
        const isPasswordMatched = await existingUser.comparePassword(req.body.password);
        if (!isPasswordMatched) {
            res.json({ message: "incorrect Password" });
            return;
        }
        else {
            // generating JWT token
            const token = existingUser.get_JWT_Token();
            const options = {
                httpOnly: true,
                sameSite: "None",
                secure: true
            }
            res.cookie("token", token, options).json({ message: "Logged In Successfully ", data: existingUser });
        }
    } catch (e) {
        console.log(e)
    }
}
const LogOut = async (req, res) => {
    try {
        res.clearCookie("token").json({ message: "Logged Out" });
    }
    catch (e) {

    }
}
const Update = async (req, res) => {
    try {
        // console.log(req.decodedToken.id);
        await User.findByIdAndUpdate(req.decodedToken.id, {
            userName: req.body.userName,
            email: req.body.email,
            password: req.body.password,
            profilePicture: req.body.profilePicture
        })
        // console.log(user)
        res.json({ message: "Details are updated" })
    }
    catch (e) {
        res.send(e);
    }
}
const Delete = async (req, res) => {
    try {
        // console.log("hii")
        await User.deleteOne({ _id: req.params.id });
        res.send("Deleted")
    }
    catch (e) {
        res.send(e);
    }
}
const getUserDetails = async (req, res) => {
    try {
        // console.log("hii")
        const user = await User.findOne({ _id: req.params.id });
        res.json({ user })
    }
    catch (e) {
        res.send(e);
    }
}
const getAllUsers = async (req, res) => {
    const query = req.query.new;
    try {
        const users = query
            ? await User.find().sort({ _id: -1 }).limit(5)
            : await User.find();

        res.json({ users })
    }
    catch (e) {
        res.send(e);
    }
}
const NumberOfUsersEveryMonth = async (re, res) => {
    // const today = new Date();
    // const latYear = today.setFullYear(today.setFullYear() - 1);
    try {
        const data = await User.aggregate([
            {
                $project: {
                    month: { $month: "$createdAt" },
                    // month: { $year: "$createdAt" },
                },
            },
            {
                $group: {
                    _id: "$month",
                    total: { $sum: 1 },
                },
            },
        ]);
        res.status(200).json(data)
    } catch (err) {
        res
            .status(500).json(err);
    }

}
const makeAdmin = async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.params.id });
        if (user.isAdmin) {
            await User.findByIdAndUpdate({ _id: req.params.id }, { isAdmin: false });
            return res.json({ message: "Updated as User" })
        }
        else {
            await User.findByIdAndUpdate({ _id: req.params.id }, { isAdmin: true });
            return res.json({ message: "Updated as Admin" })
        }
    }
    catch (e) {
        console.log(e);
    }
}
module.exports = { register, login, LogOut, Update, Delete, getUserDetails, getAllUsers, NumberOfUsersEveryMonth, makeAdmin }