import "dotenv/config";
import express from "express";
import connectDB from "./db";
import globalRouter from "./global-router";
import cors from "cors";
import path from "path";
import fs from "fs"
import { logger } from "./logger";

const app = express();
const PORT = process.env.PORT || 3000;

const createRequiredDirectories = () => {
  const directories = [
    'routes',
    'routes/s3',
    'routes/s3/uploads'
  ];

  directories.forEach(dir => {
    const fullPath = path.join(__dirname, dir);
    if (!fs.existsSync(fullPath)) {
      fs.mkdirSync(fullPath, { recursive: true });
      console.log(`Created directory: ${fullPath}`);
    }
  });
};

connectDB();
createRequiredDirectories();

app.use(cors());
app.use(logger);
app.use(express.json());
app.use("/api/v1/", globalRouter);

app.get("/helloworld", (request, response) => {
  response.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`Server runs at http://localhost:${PORT}`);
});
