import mongoose from "mongoose";
import bcrypt from "bcryptjs";

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
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
}; // add the method matchPassword to userSchema

userSchema.pre("save", async function (next) {
  // 'pre('save', ...)' allows us to do something before it is saved to database
  if (!this.isModified("password")) {
    // If the password field has not been modified, the function calls next() to move on to the next middleware.
    // this step is used to avoid re-hashing the password unnecessarily if no changes have been made to it.
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model("User", userSchema);

export default User;
