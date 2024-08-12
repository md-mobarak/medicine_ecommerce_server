import mongoose from "mongoose";
import app from "./app";
import dotenv from "dotenv";
dotenv.config();
const port = process.env.PORT;
async function main() {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    app.listen(port, () => {
      console.log(`medicine ecommerce is listening on port ${port}`);
    });

    console.log("Database is connected");
  } catch (err) {
    console.log("face this error", err);
  }
}
main();
module.exports = app;