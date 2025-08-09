// let http = require("http");

// let server = http.createServer((req, res) => {
//   res.end("Welcome to wudzique");
// });

// server.listen("5000"); //http://localhost:5000

let express = require("express");
let app = express();
//when your req is going to access json data then write this line compulsory
app.use(express.json());

app.get("/", (req, res) => {
  res.send({ status: 1, msg: "Homepage API" });
});

app.get("/about", (req, res) => {
  res.send({ status: 1, msg: "Aboutpage API" });
});

app.get("/about/:id", (req, res) => {
  let currentId = req.params.id;
  res.send("Aboutpage API" + currentId);
});

app.post("/login", (req, res) => {
  res.status(200).json({
    status: 1,
    msg: "Login page API",
    bodyData: req.body,
    queryData: req.query,
  });
  //   res.send({
  //     status: 1,
  //     msg: "Login page API",
  //     bodyData: req.body,
  //     queryData: req.query,
  //   });
});

app.listen("8000");
