import express from "express";
import UserRouter from "./routes/user";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/users", UserRouter);

app.listen(5000, () =>
  console.log(`🚀 Server ready at: http://localhost:5000`)
);
