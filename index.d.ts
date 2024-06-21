import * as express from "express-serve-static-core";
import { Request } from "express";

declare global {
  namespace Express {
    interface Request {
      file?: Express.Multer.File;
    }
  }
}
