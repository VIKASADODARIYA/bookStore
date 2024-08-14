import express from "express";
import { getAllUsers, deleteUsers, editUser, addBook, deleteBook } from "../controller/admin.controller.js";
const router = express.Router();

router.get('/users', getAllUsers);
router.delete('/delete-users/:userId', deleteUsers);
router.post('/edit-users/:userId', editUser);
router.post('/addbook', addBook);
router.delete('/delete-book/:bookId', deleteBook);

export default router;
