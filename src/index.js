const express = require("express");
const cors = require("cors");
const createError = require("http-errors");
const morgan = require("morgan");
const sessions = require("express-session");
const cookieParser = require("cookie-parser");
const path = require("path");
const { authMiddleware } = require("./middleware/auth");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
  sessions({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 }, //1 hour
    resave: false,
  })
);
app.use(morgan("dev"));

app.use(express.static("./client/build"));

app.use("/api/auth", require("./routes/auth"));
app.use("/api/admins", authMiddleware, require("./routes/admins"));
app.use("/api/posts", authMiddleware, require("./routes/posts"));
app.use(
  "/api/post_categories",
  authMiddleware,
  require("./routes/post_categories")
);

app.use(function (req, res, next) {
  next(createError(404));
});
app.use(function (err, req, res, next) {
  let errors = {
    message: err.message,
    error: req.app.get("env") === "production" ? {} : err,
  };
  res.status(err.status || 500);
  res.send(errors);
});
app.listen(5000, () =>
  console.log(`🚀 Server ready at: http://localhost:5000`)
);

BigInt.prototype.toJSON = function () {
  return Number(this);
};
