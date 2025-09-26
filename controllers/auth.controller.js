import dotenv from "dotenv";
dotenv.config({
  silent: true,
});
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const authBuilder = () => {
  const { JWT_SECRET, JWT_EXPIRATION } = process.env;
  const login = async (req, res) => {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ username });
      if (!user) {
        return res.status(404).json({ message: "Pengguna tidak ditemukan" });
      } else {
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
          return res.status(401).json({ message: "Kata sandi salah" });
        }

        const token = jwt.sign(
          {
            id: user._id,
            username: user.username,
            role: user.role,
            name: user.profile.name,
          },
          JWT_SECRET,
          {
            expiresIn: JWT_EXPIRATION || "30h",
          }
        );

        return res.status(200).json({
          message: "Login berhasil",
          payload: {
            user,
            token,
          },
        });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: error });
    }
  };
  return {
    login,
  };
};

export default authBuilder();
