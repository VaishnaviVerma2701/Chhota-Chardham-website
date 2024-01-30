
// app.js starting
const mongoose = require("mongoose");
mongoose.connect("mongodb://127.0.0.1:27017/chardham")
  .then(() => {
    console.log(`Connection successful`);
  })
  .catch((error) => {
    console.error(`Error connecting to the database: ${error.message}`);
  });
// Your server code here (assuming it's running on port 3000)
const express = require("express");
const path =require("path");
const { register } = require("module");
const app = express();
const port = 2000;
// require("./db/conn.js");

const static_path =path.join(__dirname, "../public");
app.use(express.static(static_path));


// This route will serve the chardham.html file as the starting page
app.get("/", (req, res) => {
  const chardhamPath = path.join(__dirname, "../public/chardham.html");
  res.sendFile(chardhamPath);
});

// This route will serve the register.html file
app.get("/register", (req, res) => {
  const registerPath = path.join(__dirname, "../public/register.html");
  res.sendFile(registerPath);
});

// Serve booking.html
app.get("/booking", (req, res) => {
  const bookingPath = path.join(__dirname, "../public/booking.html");
  res.sendFile(bookingPath);
});

app.get("/booking/hotel", (req, res) => {
  const bookingPath = path.join(__dirname, "../public/booking.html");
  res.sendFile(bookingPath);
});



// Define the schema for register
const gmSchema = new mongoose.Schema({
  myname: String,
  mynumber: Number,
  mygender: String,
  myemail: String,
  mypassword:String,
  myconfirmpassword:String,
});
// Create a model
const registers = mongoose.model("registers", gmSchema);
// Body parser middleware




// Define the schema for booking personal data
const bookingSchema = new mongoose.Schema({
  myname: String,
  mynumber: Number,
  myaddress: String,
  mygender: String,
  dateOfBooking: { type: Date, default: Date.now },
  // Add other fields as needed
});
// Create a model for the booking schema
const Booking = mongoose.model("Booking", bookingSchema);



// Define the schema for booking hotel data
const hotelSchema = new mongoose.Schema({
  myhotal: String,
roomnumber: Number,
  days: Number,
  myroom: String,
  dateOfBooking: { type: Date, default: Date.now },
  // Add other fields as needed
});
// Create a model for the booking schema
const Bookinghotel = mongoose.model("Bookinghotel", hotelSchema);





// Body parser middleware always common
app.use(express.urlencoded({ extended: true }));


// Handle form submissions for user registration
app.post("/register", async (req, res) => {
  try {
    const { myname, mynumber, mygender, myemail, mypassword, myconfirmpassword } = req.body;

    // Check if the password and confirm password match
    if (mypassword !== myconfirmpassword) {
      return res.status(400).send("Password and confirm password do not match");
    }

    // Create a new User instance
    const user = new registers({
      myname,
      mynumber,
      mygender,
      myemail,
      mypassword,
      myconfirmpassword,
    });

    // Save the user data to the database
    await user.save();
    res.send("Registration successful");
  } catch (error) {
    console.error(error); // Log the error to the console
    res.status(500).send("Error during registration");
  }
});





// Handle form submissions on booking.html for personal
app.post("/booking", async (req, res) => {
  try {
    // Create a new Booking instance
    const bookingData = new Booking({
      myname: req.body.myname,
      mynumber: req.body.mynumber,
      myaddress:req.body.myaddress,
      mygender:req.body.mygender,
      // Extract and assign other form fields
    });

    // Save the data to the database
    await bookingData.save();
    res.send("Booking data saved successfully!");
  } catch (error) {
    res.status(500).send("Error saving booking data to the database");
  }
});



// Handle form submissions on booking.html for hotel
app.post("/booking/hotel", async (req, res) => {
  try {
    // Create a new Booking instance
    const hotelData = new Bookinghotel({
      myhotal: req.body.myhotal,
      roomnumber: req.body.roomnumber,
      days:req.body.days,
      myroom:req.body.myroom,
      // Extract and assign other form fields
    });

    // Save the data to the database
    await hotelData.save();
    res.send("Booking data saved successfully!");
  } catch (error) {
    res.status(500).send("Error saving booking data to the database");
  }
});



// Handle form submissions for user login
app.post("/login", async (req, res) => {
  try {
      const { myname, mypassword } = req.body;
      // Check if the user exists in the database
      const user = await registers.findOne({ myname });
      if (!user) {
          return res.status(401).send("Invalid username or password");
      }
      // Check if the entered password matches the stored password
      if (user.mypassword !== mypassword) {
          return res.status(401).send("Invalid username or password");
      }
      // Authentication successful
      //res.send("login successfully");
      res.redirect("/booking");
  } catch (error) {
      console.error("Error during login:", error);
      res.status(500).send("Error during login: " + error.message);
  }
});
app.get("/chardham", (req, res) => {
  //res.send("Welcome to the dashboard!");
  const bookingPath = path.join(__dirname, "../public/chardham.html");
  res.sendFile(bookingPath);
});


app.get("/", (req, res) => {
  res.send("Hello from the chegg");
});

app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});



// test> use newfolder
// switched to db newfolder
// newfolder> show collections
// gms
// users
// newfolder> db.gms.find()
// [
//   {
//     _id: ObjectId("654f5c10905a9f70b2fb7bc7"),
//     name: 'Vishal Kumar',
//     age: 33,
//     gender: 'male',
//     locality: 'indian',
//     __v: 0
//   }
// ]