import { Router } from "express";
import { helthcheck } from "../controllers/helthcheck.controllers";
const router = Router();

router.route("/", helthcheck);

export default router;
