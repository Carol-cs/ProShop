import path from "path";
import express from "express";
import multer from "multer";
const router = express.Router();

const storage = multer.diskStorage({
  destination(req, file, cb) {
    // cb stands for "callback"
    cb(null, "uploads/"); // null is for error
  },
  filename(req, file, cb) {
    // indicate how file name is formatted
    cb(
      null,
      `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

function checkFileType(file, cb) {
  const filetypes = /jpg|jpeg|png/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);
  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb("Image only!"); // return the error
  }
}

const upload = multer({
  storage,
});

router.post("/", upload.single("image"), (req, res) => {
  // 'image' is the 'fieldname'
  //  upload.single("image") is the middleware that actually helps us upload the image
  res.send({
    message: "Image Uploaded",
    image: `/${req.file.path}`,
  });
});

export default router;
