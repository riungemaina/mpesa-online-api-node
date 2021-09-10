const express = require("express");
const cors = require("cors");
const { processPayment } = require("./paymentProcessor");

// define our app
const app = express();

// define and use cors
app.use(
  cors({
    origin: "*",
  })
);

// parse requests of content-type: application/json
app.use(express.json());

// create a route on '/' | homepage | index
app.get("/", (req, res) => {
  res.json({ message: "The Node Js server is running" });
});

// create a route on '/app' to recieve data from the front end
app.post("/app", (req, res) => {
  // check if the request is empty
  if (!req.body) {
    res.status(400).send({
      message: "The request was empty",
    });
  } else {
    console.log(req.body);
    res.status(202).send({
      message: `The data has recieved & the payment is being processed`,
    });
    processPayment(req.body);
  }
});

// create a route for mpesa to send data on the result of the transaction
app.post("/mpesaResults", (details, res) => {
  res.status(200);
  console.log(details.body);
  if (details.body.Body.stkCallback.ResultCode === 0) {
    console.log(details.body.Body.stkCallback.CallbackMetadata);
  }
});

// sets the port & listens in for requests
app.listen(3000, () => {
  console.log("the server is running");
});
