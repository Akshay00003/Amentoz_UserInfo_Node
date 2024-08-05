const express = require("express");
const UserRouter = express.Router();
const path = require("path");
const multer = require("multer");
const { CreateUser, getAllUser } = require("../Service/UserService");
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
    console.log(req.body);
console.log('from router body file', req.file);

    await CreateUser({ ...req.body,image:req.file.filename }).then((user) => res.send(user));
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
module.exports = UserRouter;
