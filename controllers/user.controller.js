import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
const userBuilder = () => {
  const register = async (req, res) => {
    try {
      const { nip, name, title, password } = req.body;
      const username = nip;
      //Check for existing user
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        return res
          .status(400)
          .json({ message: "NIP / Nama Pengguna sudah ada!" });
      }
      const hashPassword = await bcrypt.hash(password, 10);
      const profile = {
        name,
        title,
        nip,
      };
      const newUser = new User({ username, password: hashPassword, profile });
      await newUser.save();
      res.status(201).json({ message: "Berhasil mendaftar!" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

  const getUsers = async (_req, res) => {
    try {
      const users = await User.find().select("-password");
      res.status(200).json(users);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

  const getUser = async (req, res) => {
    try {
      const { _id } = req.body;
      const user = await User.findById(_id).select("-password");
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json({
        payload: user,
      });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

  const getSelf = async (req, res) => {
    try {
      const userId = req.user._id;
      const user = await User.findById(userId).select("-password");
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json({
        payload: user,
      });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

  return {
    register,
    getUsers,
    getUser,
    getSelf,
  };
};

export default userBuilder();
