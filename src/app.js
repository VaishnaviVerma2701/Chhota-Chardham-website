const express = require("express");
const path = require("path");
const mongoose = require("mongoose");

const app = express();
const port = 2000;

// Set up Mongoose connection
mongoose.connect("mongodb://127.0.0.1:27017/booked")
  .then(() => {
    console.log("Connection successful");
  })
  .catch((error) => {
    console.error(`Error connecting to the database: ${error.message}`);
  });

// Set the view engine to ejs
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "../views"));

// Middleware
app.use(express.urlencoded({ extended: true }));

const static_path = path.join(__dirname, "../");
app.use(express.static(static_path));

// Define the schema for register
const registerSchema = new mongoose.Schema({
  myname: String,
  mynumber: Number,
  mygender: String,
  myemail: String,
  mypassword: String,
  myconfirmPassword: String,
});

// Create a model for register
const Register = mongoose.model("Register", registerSchema);

// Define the schema for booking
const bookingSchema = new mongoose.Schema({
  myName: String,
  myNumber: String,
  myEmail: String,
  myGender: String,
  myAddress: String,
  hotelName: String,
  roomRent: String,
  myDate: Date,
  myDays: Number,
  familyMembers: Number,
  paymentMethod: String,
});

// Create a model for booking
const Booking = mongoose.model("Booking", bookingSchema);

// Routes
app.get("/", (req, res) => {
  const indexPath = path.join(__dirname, "../index.html");
  res.sendFile(indexPath);
});

app.get("/register", (req, res) => {
  const registerPath = path.join(__dirname, "../register.html");
  res.sendFile(registerPath);
});

app.post("/register", async (req, res) => {
  try {
    const { myname, mynumber, mygender, myemail, mypassword, myconfirmPassword } = req.body;
    if (mypassword !== myconfirmPassword) {
      return res.status(400).send("Password and confirm password do not match");
    }
    const user = new Register({
      myname,
      mynumber,
      mygender,
      myemail,
      mypassword,
      myconfirmPassword,
    });
    await user.save();
    res.redirect("../login.html");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error during registration");
  }
});

app.post("/login", async (req, res) => {
  try {
    const { myemail, mypassword } = req.body;
    const user = await Register.findOne({ myemail });
    if (!user || user.mypassword !== mypassword) {
      return res.status(401).send("Invalid username or password");
    }
    res.redirect("../booking.html");
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).send("Error during login: " + error.message);
  }
});

app.post("/booking", async (req, res) => {
  try {
    const {
      myName,
      myNumber,
      myEmail,
      myGender,
      myAddress,
      hotelName,
      roomRent,
      myDate,
      myDays,
      familyMembers,
      paymentMethod
    } = req.body;
    const booking = new Booking({
      myName,
      myNumber,
      myEmail,
      myGender,
      myAddress,
      hotelName,
      roomRent,
      myDate,
      myDays,
      familyMembers,
      paymentMethod,
    });
    await booking.save();
    res.send("Booking successful");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error during booking");
  }
});

app.get("/open", (req, res) => {
  const openPath = path.join(__dirname, "../open.html");
  res.sendFile(openPath);
});

// Admin route to display registered users and booking details
app.get("/admin", async (req, res) => {
  try {
    const registers = await Register.find();
    const bookings = await Booking.find();
    res.render("admin", { registers, bookings });
  } catch (error) {
    console.error("Error fetching admin data:", error);
    res.status(500).send("Error fetching admin data");
  }
});

app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});