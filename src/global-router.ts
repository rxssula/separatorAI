import { Router } from "express";
import authRouter from "./routes/auth/auth-router";
import filesRouter from "./routes/files/files-router";
import s3Router from "./routes/s3/s3-router";
// other routers can be imported here

const globalRouter = Router();

globalRouter.use(authRouter);
globalRouter.use(s3Router);

// other routers can be added here

export default globalRouter;
