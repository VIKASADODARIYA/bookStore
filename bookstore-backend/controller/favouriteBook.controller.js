import Users from "../model/user.model.js";
import Books from "../model/book.model.js";

export const addFavouriteBook = async (req, res) => {
  try {
    const { userId, bookId } = req.body;

    const user = await Users.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!user.favourites.includes(bookId)) {
      user.favourites.push(bookId);
      await user.save();
    }

    res.status(200).json({ message: "Book added to favourites" });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const removeFavouriteBook = async (req, res) => {
  try {
    const { userId, bookId } = req.body;

    const user = await Users.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.favourites = user.favourites.filter(id => id.toString() !== bookId);
    await user.save();

    res.status(200).json({ message: "Book removed from favourites" });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getFavouriteBooks = async (req, res) => {
  try {
    const userId = req.params.userId;

    const user = await Users.findById(userId).populate('favourites');
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ favourites: user.favourites });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
