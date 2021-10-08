const express = require("express");
const cors = require("cors");
BigInt.prototype.toJSON = function () {
  return Number(this);
};
const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/admins", require("./routes/admins"));
app.use("/api/posts", require("./routes/posts"));
app.use("/api/post_categories", require("./routes/post_categories"));

app.use((err, res) => {
  res.status(err.status || 500);
  res.send(err.message);
});
app.listen(5000, () =>
  console.log(`🚀 Server ready at: http://localhost:5000`)
);
