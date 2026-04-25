import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userModel from './../models/userModel.js';


const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET)
}


//  Route for user login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // ✅ ADMIN LOGIN
    if (email === process.env.ADMIN_EMAIL || password === process.env.ADMIN_PASSWORD) {
      const token = jwt.sign({ role: "admin" }, process.env.JWT_SECRET);
      console.log(token);
      return res.json({
        success: true,
        token,
        user: {
          _id: "admin123",
          name: "Admin",
          role: "admin",
        },
      });
    }

    // ✅ USER LOGIN
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: "User doesn't exist" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (isMatch) {
      const token = jwt.sign(
        { id: user._id, role: "user" },
        process.env.JWT_SECRET
      );

      return res.json({
        success: true,
        token,
        user: {
          _id: user._id,   // ✅ MUST
          name: user.name,
          role: "user",
        },
      });
    } else {
      return res.json({ success: false, message: "Invalid credentials" });
    }

  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
//  Route for user register
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const exists = await userModel.findOne({ email });
    if (exists) {
      return res.json({ success: false, message: "User already exists" });
    }

    if (!validator.isEmail(email)) {
      return res.json({ success: false, message: "Invalid email" });
    }

    if (password.length < 8) {
      return res.json({ success: false, message: "Password too short" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await userModel.create({
      name,
      email,
      password: hashedPassword,
    });

    const token = createToken(newUser._id);

    // ✅ IMPORTANT FIX
    res.json({
      success: true,
      token,
      user: {
        _id: newUser._id,
        name: newUser.name,
        role: "user",
      },
    });

  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

//Route for admin login  
const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body

    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
      const token = jwt.sign(email + password, process.env.JWT_SECRET);
      res.json({ success: true, token })
    }
    else {
      res.json({ success: false, message: "Invalid credentials" })
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message })

  }
}


export { loginUser, registerUser, adminLogin }