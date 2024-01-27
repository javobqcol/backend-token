import {Router} from "express";
import { body } from "express-validator";

import { login, register, infoUser, refreshToken, logout} from "../controllers/auth.controller.js";
import { bodyLoginValidator, bodyRegisterValidator, validationResultExpress } from "../middleware/validatorManager.js";
import { requireToken} from "../middleware/requireToken.js";
import { requireRefreshToken } from "../middleware/requireRefreshToken.js";

const router = Router();

router.post(
  "/login",
  bodyLoginValidator,
  login
);

router.post("/register",bodyRegisterValidator, register);

router.get("/protected", requireToken, infoUser)
router.get("/refresh",requireRefreshToken,(req, res, next)=>{console.log("sigo");next();}, refreshToken)
router.get("/logout", logout)
export default router;
