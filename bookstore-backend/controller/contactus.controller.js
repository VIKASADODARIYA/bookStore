import ContactUs from "../model/contactus.model.js";

export const contactUs = async (req, res) => {
    try {
        const { fullname, email, message } = req.body;

        const newMessage = new ContactUs({
            fullname,
            email,
            message
        });

        await newMessage.save();

        res.status(201).json({
            message: "Message saved successfully",
            user: {
                fullname: newMessage.fullname,
                email: newMessage.email,
                message: newMessage.message
            },
        });
    } catch (error) {
        console.error("Error:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};
