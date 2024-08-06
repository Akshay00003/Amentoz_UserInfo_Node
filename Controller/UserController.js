const express = require("express");
const UserRouter = express.Router();
const User = require("../Models/UserModel");
const path = require("path");
const multer = require("multer");
const {
  CreateUser,
  getAllUser,
  updateUser,
  getUser,
} = require("../Service/UserService");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/Images");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});
const upload = multer({
  storage: storage,
});
UserRouter.post("/create", upload.single("image"), async (req, res) => {
  try {
    //     console.log(req.body);
    // console.log('from router body file', req.file);

    await CreateUser({ ...req.body, image: req.file.filename }).then((user) =>
      res.send(user)
    );
  } catch {
    (err) => console.log(err);
  }
});
UserRouter.get("/users", async (req, res) => {
  try {
    const user = await getAllUser();
    return res.send(user);
  } catch {
    (err) => console.log(err);
  }
});
UserRouter.get("/user/:id", async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);

    const user = await getUser(id);
    return res.send(user);
  } catch (err) {
    return err;
  }
});
UserRouter.delete("/delete/:id", async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);

    const user = await User.findByIdAndDelete(id);
    return res.send(user);
  } catch (err) {
    return res.json(err);
  }
});
UserRouter.put("/update/:id", upload.single("image"), async (req, res) => {
  try {
    const id = req.params.id;

    // const formData = req.body;
    console.log(id,req.body,req.file);

    // if (req.file) {
    //   updatedData.image = req.file.path;
    // }
    const user = await updateUser({ ...req.body, image: req.file.filename },id)
    .then(user=>res.send(user))

  } catch (err) {
    return res.status(500).send(err);
  }
});
module.exports = UserRouter;
