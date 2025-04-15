import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const allowFileTypes = ["image/jpg", "image/png", "image/jpeg"];

    if (!allowFileTypes.includes(file.mimetype)) {
      cb(new Error("This filetype is not accepted"));
      return;
    }
    cb(null, "./public/temp");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.originalname + "-" + uniqueSuffix);
  },
});

const upload = multer({
  storage,
});
