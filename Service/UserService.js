const User = require("../Models/UserModel");

const CreateUser = async (userData) => {
  try {
    console.log("from service ", userData);

    const newUser = new User(userData);
    return await newUser.save();
  } catch (err) {
    console.error("Error creating user:", err);
    throw err;
  }
};
const getAllUser = async () => {
  try {
    const user = await User.find({});
    return user;
  } catch (err) {
    console.error("Error creating user:", err);
    throw err;
  }
};

module.exports = { CreateUser,getAllUser };
