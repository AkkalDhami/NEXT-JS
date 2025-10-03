import argon2 from "argon2";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },

    todos: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Todo",
      },
    ],
  },
  { timestamps: true }
);

userSchema.index({ email: 1 }, { unique: true });

userSchema.pre("save", function (next) {
  if (!this.isModified("password")) return next();
  this.password = argon2.hash(this.password);
  next();
});

userSchema.methods.isValidPassword = async function (password) {
  return argon2.verify(this.password, password);
};

export default mongoose.models.User || mongoose.model("User", userSchema);
