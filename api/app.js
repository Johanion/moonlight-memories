//  import packages 
const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios"); // to make requests for API
const cors = require("cors");
require("dotenv").config();

const app = express(); 
const port = 3000;

// cors policy might block api request
const cors = require('cors');
app.use(cors());


// Serve static files from the "public" folder
app.use(express.static("public")); // to access static files from folder public
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// routing to the page
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/public/index.html");
});

// Handle form submission
app.post("/", async function (req, res) {
  const date = req.body.dateInput;
  const lat = req.body.lat;
  const lon = req.body.lon;
  

  try {
    if (!lat || !lon || !date) {
      return res.send("Missing required fields: date, latitude, or longitude.");
    }

    // Prepare the request for the AstronomyAPI
    const params = {
      style: {
        moonStyle: "default",
        backgroundStyle: "stars",
        backgroundColor: "#000000",
        headingColor: "#ffffff",
        textColor: "#ffffff"
      },
      observer: {
        latitude: parseFloat(lat),
        longitude: parseFloat(lon),
        date: date
      },
      view: {
        type: "portrait-simple"
      }
    };

    const headers = {
      Authorization:
        "Basic " +
        Buffer.from(`${process.env.APP_ID}:${process.env.APP_SECRET}`).toString("base64"),
      "Content-Type": "application/json"
    };

    const response = await axios.post(
      "https://api.astronomyapi.com/api/v2/studio/moon-phase",
      params,
      { headers }
    );

    // Send back the moon image URL
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <title>Moon Phase</title>
          <style>
            body {
              background-color: #000;
              color: #fff;
              font-family: 'Arial', sans-serif;
              text-align: center;
              padding: 50px;
            }
      
            h1 {
              font-size: 3rem;
              color: #ffcc00;
              margin-bottom: 20px;
              text-shadow: 2px 2px 10px rgba(255, 255, 255, 0.6);
            }
      
            img {
              width: 80%;
              max-width: 600px;
              border-radius: 15px;
              box-shadow: 0 4px 10px rgba(255, 255, 255, 0.6);
              transition: transform 0.3s ease;
            }
      
            img:hover {
              transform: scale(1.05);
            }
      
            a {
              display: inline-block;
              margin-top: 20px;
              padding: 10px 30px;
              background-color: #333;
              color: #fff;
              text-decoration: none;
              font-size: 1.2rem;
              border-radius: 10px;
              transition: background-color 0.3s ease;
            }
      
            a:hover {
              background-color: #444;
            }
          </style>
        </head>
        <body>
          <h1>Moon Phase on ${date}</h1>
          <img src="${response.data.data.imageUrl}" alt="Moon Phase">
          <br><a href="/">🔙 Back</a>
        </body>
        </html>
      `);
      


  } catch (error) {
    console.error("API Error:", error.response?.data || error.message);
    res.send("Failed to fetch moon phase. Try again.");
    console.log("Date:", date);
    console.log("Latitude:", lat);
    console.log("Longitude:", lon);
  }
});

// // Start the server
// app.listen(port, function () {
//   console.log("Server is running on port 3000.");
// });



module.exports= app;
















// const express = require("express");
// const bodyParser = require("body-parser");
// const axios = require("axios");
// require("dotenv").config();

// const app = express();
// const port = 3000;

// // Serve static files from the "public" folder
// app.use(express.static("public"));
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.json());

// // Serve the HTML file
// app.get("/", function (req, res) {
//   res.sendFile(__dirname + "/index.html");
// });

// // Handle form submission
// app.post("/", async function (req, res) {
//   const date = req.body.dateInput;
//   const lat = req.body.lat;
//   const lon = req.body.lon;

//   try {
//     // Prepare the request for the AstronomyAPI
//     const params = {
//       style: {
//         moonStyle: "default",
//         backgroundStyle: "stars",
//         backgroundColor: "#000000",
//         headingColor: "#ffffff",
//         textColor: "#ffffff"
//       },
//       observer: {
//         latitude: parseFloat(lat),
//         longitude: parseFloat(lon),
//         date: date || new Date().toISOString().split('T')[0]
//       },
//       view: {
//         type: "portrait-simple"
//       }
//     };

//     const headers = {
//       Authorization:
//         "Basic " +
//         Buffer.from(`${process.env.APP_ID}:${process.env.APP_SECRET}`).toString("base64"),
//       "Content-Type": "application/json"
//     };

//     const response = await axios.post(
//       "https://api.astronomyapi.com/api/v2/studio/moon-phase",
//       params,
//       { headers }
//     );

//     // Send back the moon image URL
//     res.send(`
//       <h1>Moon Phase on ${date}</h1>
//       <img src="${response.data.data.imageUrl}" alt="Moon Phase">
//       <br><a href="/">Back</a>
//     `);
//   } catch (error) {
//     console.error("API Error:", error.response?.data || error.message);
//     res.send("Failed to fetch moon phase. Try again.");
//     console.log(date);
//     console.log(lat);
//     console.log(lon);
//   }
// });

// // Start the server
// app.listen(port, function () {
//   console.log("Server is running on port 3000.");
// });
