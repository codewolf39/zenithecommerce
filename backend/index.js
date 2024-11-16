const express = require("express");
const app = express();
const morgan = require("morgan");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");

app.use(express.json());
app.use(morgan("dev"));

dotenv.config({ path: "./.env" });

//Connecting to MongoDB
const DB = process.env.DATABASE_URL.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {})
  .then(() => console.log("Connected to database"))
  .catch((err) => console.log(err.message));

//Routes

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/user", userRoute);

//Listenting to server
app.listen(process.env.PORT || 3000, (req, res) => {
  console.log("Server is running on port 3000");
});
