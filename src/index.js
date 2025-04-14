import dotenv from "dotenv";
import { app } from "./app.js";
import connectDB from "./db/index.js";

dotenv.config({
  path: "./.env",
});

const PORT = process.env.PORT || 3002;

connectDB()
  .then(
    app.listen(PORT, () => {
      console.log(`Server is listening at : ${PORT}`);
    })
  )
  .catch((err) => {
    console.log("Mogodb connection error", err);
  });
