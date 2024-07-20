import { Router } from "express";

const filesRouter = Router();

filesRouter.get("/", (req, res) => {
  res.json({ message: "You have access to this route!" });
});

export default filesRouter;
