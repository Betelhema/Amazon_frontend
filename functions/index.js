// const {onRequest} = require("firebase-functions/v2/https");
// const logger = require("firebase-functions/logger");
// const express = require ("express");
// const cors = require ("cors");
// const dotenv = requre ("dotenv");
// dotenv.config();
// const stripe = require("stripe")(process.env.STRIPE_KEY);


// const app = express
// app.use(cors({origin:true}))
// app.use(express.json())

// app.get("/", (req, res) => {
//     res.status(200).json({
//       message: "working",
//     });
//   });

//   exports.api = onRequest(app);








// const { onRequest } = require("firebase-functions/v2/https");
// const logger = require("firebase-functions/logger");
// const express = require("express");
// const cors = require("cors");
// const dotenv = require("dotenv");

// dotenv.config();

// const stripe = require("stripe")(process.env.STRIPE_KEY);

// const app = express();
// app.use(cors({ origin: true }));
// app.use(express.json());

// app.get("/", (req, res) => {
//   res.status(200).json({
//     message: "working",
//   });
// });

// exports.api = onRequest(app);

const { onRequest } = require("firebase-functions/v2/https");
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

// Load environment variables from .env file
dotenv.config();

// Initialize Stripe with the secret key from environment variables
const stripe = require("stripe")(process.env.STRIPE_KEY);

// Initialize Express app
const app = express();

// Middleware to enable CORS and parse JSON
app.use(cors({ origin: true }));
app.use(express.json());

// Define a simple GET endpoint
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Working",
  });
});

// Define a POST endpoint to handle payments
app.post("/payment/create", async (req, res) => {
  try {
    const total = parseInt(req.query.total) ; // Assuming total is sent as a query parameter

    if (total > 0) {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: total,
        currency: "usd",
      });

      res.status(201).json({
        clientSecret: paymentIntent.client_secret,
      });
    } else {
      res.status(403).json({ error: "The amount must be greater than zero." });
    }
  } catch (error) {
    console.error("Error creating payment intent:", error);
    res.status(500).json({ error: "An error occurred while creating the payment intent." });
  } // Closing bracket for try-catch block
}); // Closing bracket for POST endpoint

// Export the Express app as a Firebase HTTP function
exports.api = onRequest(app);

