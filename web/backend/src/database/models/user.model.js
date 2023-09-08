/* eslint-disable func-names */
import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";

const User = new Schema({
    username: { type: String, required: true, unique: true, trim: true, minlength: 2, maxlength: 18 },
    email: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true, minlength: 8, maxlength: 18, trim: true },
}, {
    timestamps: true,
});

User.methods.matchPassword = async function (password) {
    return bcrypt.compare(password, this.password);
};

User.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }

    const salt = await bcrypt.genSalt(10);
    
    this.password = await bcrypt.hash(this.password, salt);
});

export default model("users", User);