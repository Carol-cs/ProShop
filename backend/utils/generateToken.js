import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const generateToken = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "30d", // if ommited, the token will not expire
  }); // create a token: jwt.sign(Payload, secret, jwtOptions )

  // Set JWT as HTTP-Only Cookie
  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development", // in production mode, we want this to be true
    sameSite: "strict",
    maxAge: 30 * 24 * 60 * 1000, // in milliseconds, 30 days
  });
};

export default generateToken;
