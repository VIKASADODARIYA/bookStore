import express from "express";
import { signup, login, userdetails, forgotPassword , editUserDetails, deleteUser} from "../controller/user.controller.js";
const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/userdetails/:userId", userdetails);
router.post("/forgot-password", forgotPassword);
router.put("/edit-details/:userId", editUserDetails);
router.delete("/delete-user/:userId", deleteUser);

export default router;
