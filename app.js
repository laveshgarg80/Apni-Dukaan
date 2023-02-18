require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 4000;

const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
};

app.use(cors(corsOptions));

//Home Route
app.get("/", (req, res) => {
  res.send("Home Route!!");
});

//Get all products
app.post("/getProducts", (req, res) => {
  let limit = req.query["limit"];

  axios
    .get(
      `https://dummyjson.com/products?limit=${limit}&select=title,thumbnail,price`
    )
    .then(function (response) {
      console.log(response.data);

      res.send(response.data);
    });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
