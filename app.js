const Express = require("express");
const App = Express();
const AuthRoutes = require("./routes/auth");
const Dotenv = require("dotenv");
const cors = require("cors");
const TransactionRoutes = require("./routes/transaction");
const SheetRoutes = require("./routes/sheet");
const ResultRoutes = require("./routes/result");
const SubjectRoutes = require("./routes/subject");
const marksheetRoutes = require("./routes/marksheet");
const settingsRoutes = require("./routes/settings");
const studentsRoutes = require("./routes/students");

Dotenv.config({
  path: "./.env",
});

require("./db");

App.use(Express.json());
App.use(
  Express.urlencoded({
    extended: true,
  })
);

const Port = process.env.PORT;

App.use(cors());

App.use("/", AuthRoutes);
App.use("/bill", TransactionRoutes);
App.use("/sheet", SheetRoutes);
App.use("/result", ResultRoutes);
App.use("/subject", SubjectRoutes);
App.use("/marksheet", marksheetRoutes);
App.use("/settings", settingsRoutes);
App.use("/students", studentsRoutes);

App.use((err, req, res, next) => {
  res.status(404).json({
    msg: err,
  });
});

App.listen(Port, (err, done) => {
  if (err) {
    console.log("failure starting server");
  } else {
    console.log("Server started listening at port " + Port);
  }
});
