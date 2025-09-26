import mongoose from "mongoose";
const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
  profile: {
    name: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    nip: {
      type: String,
      required: true,
      unique: true,
    },
  },
});

export const User = mongoose.model("User", userSchema);
export default User;
