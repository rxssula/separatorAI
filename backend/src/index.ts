import "dotenv/config";
import express from "express";
import connectDB from "./db";
import globalRouter from "./global-router";
import cors from "cors";
import path from "path";
import fs from "fs";
import { logger } from "./logger";
import { execSync } from "child_process";

const app = express();
const PORT = process.env.PORT || 3000;

const createRequiredDirectories = () => {
  const directories = [
    "routes",
    "routes/s3",
    "routes/s3/uploads",
    "routes/s3/output",
    "routes/s3/output/hdemucs_mmi",
  ];

  directories.forEach((dir) => {
    const fullPath = path.join(__dirname, dir);
    if (!fs.existsSync(fullPath)) {
      fs.mkdirSync(fullPath, { recursive: true });
      console.log(`Created directory: ${fullPath}`);
    }
  });
};

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

app.get("/pip-list", (req, res) => {
  try {
    const pipList = execSync("pip list").toString();
    res.send(pipList);
  } catch (error: any) {
    res.status(500).send("Error getting pip list: " + error.message);
  }
});

app.listen(PORT, () => {
  console.log(`Server runs at http://localhost:${PORT}`);
});
