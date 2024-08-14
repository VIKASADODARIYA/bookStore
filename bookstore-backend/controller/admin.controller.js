import Users from "../model/user.model.js";
import Book from "../model/book.model.js";

export const getAllUsers = async (req, res) => {
    try {
        const users = await Users.find({});
        res.status(200).json(users);
    } catch (error) {
        console.error("Error fetching users:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const deleteUsers = async (req, res) => {
    try {
        const userId = req.params.userId;

        const deletedUser = await Users.findByIdAndDelete(userId);

        if (!deletedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ message: "User deleted successfully", user: deletedUser });
    } catch (error) {
        console.error("Error:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const editUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const { fullname, phone, email, role } = req.body;

        const updatedUser = await Users.findByIdAndUpdate(
            userId,
            { fullname, phone, email, role },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ message: "User details updated successfully", user: updatedUser });
    } catch (error) {
        console.error("Error:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const addBook = async (req, res) => {
    try {
        const { title, name, price, category, image } = req.body;

        // Validate required fields
        if (!title || !name || !price || !category || !image) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Create a new book instance
        const newBook = new Book({
            title,
            name,
            price,
            category,
            image
        });

        // Save the book to the database
        await newBook.save();

        // Respond with success message and book data
        res.status(201).json({
            message: "Book added successfully",
            book: {
                _id: newBook._id,
                title: newBook.title,
                name: newBook.name,
                price: newBook.price,
                category: newBook.category,
                image: newBook.image
            }
        });
    } catch (error) {
        console.error("Error in addBook function:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const deleteBook = async (req, res) => {
    try {
        const bookId = req.params.bookId;

        console.log("Attempting to delete book with ID:", bookId);
        const deletedBook = await Book.findByIdAndDelete(bookId);

        if (!deletedBook) {
            return res.status(404).json({ message: "Book not found" });
        }

        res.status(200).json({ message: "Book deleted successfully", books: deletedBook });
    } catch (error) {
        console.error("Error deleting book:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};
