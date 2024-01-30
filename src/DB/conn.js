//  const mongoose = require("mongoose");

// mongoose.connect("mongodb://127.0.0.1:27017/loginApp")
//   .then(() => {
//     console.log(`Connection successful`);
//   })
//   .catch((error) => {
//     console.error(`Error connecting to the database: ${error.message}`);
//   });



//app.js starting
// const mongoose = require("mongoose");
// mongoose.connect("mongodb://127.0.0.1:27017/newfolder")
//   .then(() => {
//     console.log(`Connection successful`);
//   })
//   .catch((error) => {
//     console.error(`Error connecting to the database: ${error.message}`);
//   });

// // Your server code here (assuming it's running on port 3000)
// const express = require("express");
// const path =require("path");
// const app = express();
// const port = 3000;
// // require("./db/conn.js");

// const static_path =path.join(__dirname, "../public");
// app.use(express.static(static_path));

// app.get("/", (req, res) => {
//   res.send("Hello from the chegg");
// });

// app.listen(port, () => {
//   console.log(`Server is running at port ${port}`);
// });