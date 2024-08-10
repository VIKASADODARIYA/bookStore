import express from "express";
import { signup, login, userdetails, forgotPassword, editUserDetails, deleteUser } from "../controller/user.controller.js";
import upload from "../middleware/upload.js";
import { contactUs } from "../controller/contactus.controller.js";
import { addFavouriteBook, removeFavouriteBook, getFavouriteBooks } from "../controller/favouriteBook.controller.js";

const router = express.Router();

router.post("/signup", upload.single('profile'), signup);
router.post("/login", login);
router.get("/userdetails/:userId", userdetails);
router.post("/forgot-password", forgotPassword);
router.put("/edit-details/:userId", editUserDetails);
router.delete("/delete-user/:userId", deleteUser);
router.post("/contact-us", contactUs);
router.post("/add-favourite", addFavouriteBook);
router.post("/remove-favourite", removeFavouriteBook);
router.get("/favourites/:userId", getFavouriteBooks);

export default router;
