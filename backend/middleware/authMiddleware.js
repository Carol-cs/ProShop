import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
import asyncHandler from "./asyncHandler.js";
import User from "../models/userModel.js";

// Protect routes
const protect = asyncHandler(async (req, res, next) => {
  let token;

  // Read the JWT from the cookie
  token = req.cookies.jwt; // we name the cookie 'jwt'
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.userId).select("-password"); // remove 'password' field from the returned user object
      // add that user to the request object, then this user object will be on the request object in all of our routes.
      // for example, when getUserProfile, we can get the (logged in) user from req object

      next();
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  } else {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

// Admin middleware
const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error("Not authorized as admin");
  }
};

export { protect, admin };
