import express from "express";
import { getAllUser, logiN, signUp } from "../controllers/user-controller";

const router = express.Router();

router.get("/" ,getAllUser );
router.post("/signup" , signUp)
router.post("/login" , logiN )


export default router;