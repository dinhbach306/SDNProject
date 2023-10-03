import mongoose from "mongoose";
import dotenv from "dotenv";
import app from "./index";

type MongooseConnection = Promise<typeof import("mongoose")>;

dotenv.config({ path: ".env" });

const DB = process.env.DATABASE?.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD || ""
);

const connectToMongoDB = async (): MongooseConnection => {
  const connection = await mongoose.connect(DB || "");
  console.log("🚀[server]: MongoDB is connected");
  return connection;
};

connectToMongoDB();

const port = process.env.PORT || 3100;
const server = app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
