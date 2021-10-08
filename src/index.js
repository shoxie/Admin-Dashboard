const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/admins", require("./routes/admins"));

app.listen(5000, () =>
  console.log(`🚀 Server ready at: http://localhost:5000`)
);
