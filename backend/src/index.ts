import "dotenv/config";
import express from "express";
import connectDB from "./db";
import globalRouter from "./global-router";
import cors from "cors";
import path from "path";
import fs from "fs";
import { logger } from "./logger";

const app = express();
const PORT = process.env.PORT || 3000;

const createRequiredDirectories = () => {
  const directories = ["routes", "routes/s3", "routes/s3/uploads"];

  directories.forEach((dir) => {
    const fullPath = path.join(__dirname, dir);
    if (!fs.existsSync(fullPath)) {
      fs.mkdirSync(fullPath, { recursive: true });
      console.log(`Created directory: ${fullPath}`);
    }
  });
};

function logPipList() {
  try {
    const pipList = fs.readFileSync("/app/pip_list.txt", "utf8");
    console.log("Installed Python packages:");
    console.log(pipList);
  } catch (error) {
    console.error("Error reading pip list:", error);
  }
}

connectDB();
createRequiredDirectories();

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});
app.use(logger);
app.use(express.json());
app.use("/api/v1/", globalRouter);

app.get("/helloworld", (request, response) => {
  response.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`Server runs at http://localhost:${PORT}`);
  logPipList();
});
