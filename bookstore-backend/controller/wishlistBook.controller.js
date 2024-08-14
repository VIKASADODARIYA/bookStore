import Users from "../model/user.model.js";
import Books from "../model/book.model.js";

export const addWishlistBook = async (req, res) => {
    try {
        const { userId, bookId } = req.body;

        const user = await Users.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (!user.wishlist.includes(bookId)) {
            user.wishlist.push(bookId);
            await user.save();
        }

        res.status(200).json({ message: "Book added to wishlist" });
    } catch (error) {
        console.error("Error:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const removeWishlistBook = async (req, res) => {
    try {
        const { userId, bookId } = req.body;

        const user = await Users.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        user.wishlist = user.wishlist.filter(id => id.toString() !== bookId);
        await user.save();

        res.status(200).json({ message: "Book removed from wishlist" });
    } catch (error) {
        console.error("Error:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const getWishlistBooks = async (req, res) => {
    try {
        const userId = req.params.userId;

        const user = await Users.findById(userId).populate('wishlist');
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ wishlist: user.wishlist });
    } catch (error) {
        console.error("Error:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};
