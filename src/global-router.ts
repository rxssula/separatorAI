import { Router } from "express";
import authRouter from "./routes/auth/auth-router";
import filesRouter from "./routes/files/files-router";
// other routers can be imported here

const globalRouter = Router();

globalRouter.use(authRouter);
globalRouter.use(filesRouter);

// other routers can be added here

export default globalRouter;
