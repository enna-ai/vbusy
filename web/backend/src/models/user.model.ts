import { Schema, model, Document } from "mongoose";
import bcrypt from "bcryptjs";

interface UserModel extends Document {
    username: string;
    email: string;
    password: string;
    matchPassword(password: string): Promise<boolean>;
}

const UserSchema = new Schema<UserModel>({
    username: { type: String, required: true, unique: true, trim: true, minlength: 2, maxlength: 18 },
    email: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true, minlength: 8, maxlength: 18, trim: true },
}, {
    timestamps: true,
});

UserSchema.methods.matchPassword = async function (password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
};

UserSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }

    const salt = await bcrypt.genSalt(10);
    
    this.password = await bcrypt.hash(this.password, salt);
});

const User = model<UserModel>("users", UserSchema);

export default User;