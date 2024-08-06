const User = require("../Models/UserModel");

const CreateUser = async (userData) => {
  try {
    // console.log("from service ", userData);

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
const getUser = async (id) => {
  try {
    const user = await User.findById(id);
    return user;
  } catch (error) {
    return error;
  }
};
const updateUser = async (id, updatedData) => {
  try {
    console.log("from service", id, updatedData);

    const user = await User.findByIdAndUpdate(updatedData, id, { new: true });
    return user;
  } catch (err) {
    console.log(err);
  }
};

module.exports = { CreateUser, getAllUser, updateUser, getUser };
