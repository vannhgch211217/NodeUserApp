const cors = require("cors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const User = require("./models/User"); // Adjust the path if necessary

dotenv.config();

const coursesRouter = require("./routes/course"); 
const classesRouter = require("./routes/class");
const usersRouter = require("./routes/user"); 

const app = express();
app.use(cors());

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/api", coursesRouter); 
app.use("/api", classesRouter); 
app.use("/api", usersRouter); 

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI) 
  .then(() => {
    console.log("Connected to MongoDB!");
    seedDatabase();
  })
  .catch((error) => console.error("MongoDB connection failed:", error));

const seedDatabase = async () => {
  try {
    const exampleUser = new User({
      email: "test@example.com",
      classIds: ["672641eeec9d8c7fcc1f6b0b", "672641eeec9d8c7fcc1f6b0e"], 
    });

    await exampleUser.save();
    console.log("Example user added:", exampleUser);
  } catch (error) {
    console.error("Error seeding the database:", error);
  }
};

module.exports = app;
