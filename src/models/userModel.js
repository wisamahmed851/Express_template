const mongoose = require("mongoose")
const bcrypt = require("bcrypt")

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    image: {
        type: String,
    },
    password: {
        type: String,
        required: true
    },
    phone: {
        type: String,
    },
    address: {
        type: String,
    },
    gender: {
        type: String,
    },
    status: {
        type: Number,
        default: 1
    },
    refereshToken: {
        type: String,
        default: null,
    },
    // add this to your userSchema
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    }
}, { timestamps: true });
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next;

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);

    next;
});
userSchema.set("toJSON", {
    transform: function (doc, ret) {
        delete ret.password;
        delete ret.__v;
        return ret;
    }
});
module.exports = mongoose.model("User", userSchema);