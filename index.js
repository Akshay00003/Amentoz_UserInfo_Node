const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();

require("dotenv").config();
const { MONGO_URL, PORT } = process.env;
const UserRouter = require("./Controller/UserController");

mongoose
  .connect(MONGO_URL)
  .then(() => console.log("MongoDB is connected successfully"))
  .catch((err) => console.log(err));
app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});
app.use(express.json());
app.use(express.static("public"));
app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use("/", UserRouter);
