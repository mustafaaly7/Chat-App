import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  fullname: {
    type: String,
    required: true,
  },
  profilePic: {
    type: String,
    default: "https://t4.ftcdn.net/jpg/00/87/28/19/360_F_87281963_29bnkFXa6RQnJYWeRfrSpieagNxw1Rru.jpg",
  },
},{
    timestamps : true
});

const userModel =  mongoose.model("User", userSchema);

export default userModel