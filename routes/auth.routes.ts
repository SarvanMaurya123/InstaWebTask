import { Router } from "express";
import { signup } from "../controller/auth/singup";
import { login } from "../controller/auth/login";
import { logout } from "../controller/auth/logout";
import { refreshToken } from "../controller/auth/refresh-token";
import { protect } from "../utiles/auth.middleware";
import { me } from "../controller/auth/me";
const router = Router();

router.post("/signup", signup);
router.post("/login", login);

router.post("/logout", logout);

router.post(
  "/refresh-token",
  refreshToken
);

router.get("/me", protect, me);

export default router;