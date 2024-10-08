import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    fullname: {
        type: String,
        required: true,
    },
    profile: {
        type: String,
        required: false,
    },
    phone: {
        type: Number,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        default: 'user',
    },
    favourites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book' }],
    wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book' }]
});
const User = mongoose.model("Users", userSchema);
export default User;