require("dotenv").config();
const Axios = require("axios");
const express = require("express");
const serverless = require("serverless-http");
const cors = require("cors");
const router = express.Router();
const port = 3000;
const app = express();

const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
};

app.use(cors(corsOptions));
app.use(`/.netlify/functions/api`, router);

//Home Route
router.get("/", (req, res) => {
  res.send("Home Route!!");
});

//Get all products

router.post("/getProducts", (req, res) => {
  let limit = req.query["limit"];
  Axios.get(
    `https://dummyjson.com/products?limit=${limit}&select=title,thumbnail,price`
  ).then(function (response) {
    console.log(response.data);
    res.send(response.data);
  });
});

//App Listening at port 3000
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

module.exports = app;
module.exports.handler = serverless(app);
