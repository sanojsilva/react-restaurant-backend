const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const session = require("express-session");
const SessionStore = require("connect-sqlite3")(session);
const cors = require("cors");
const multer = require("multer");
const authRouter = require("./routes/authRoutes");
const itemRouter = require("./routes/itemRoutes");
const app = express();
dotenv.config();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../public/uploads/"));
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });
const PORT = process.env.PORT || 3000;

app.use(express.static("public"));
app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);
app.use(
  session({
    store: new SessionStore(),
    secret: "MY_SECRET",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);
app.use("/auth", authRouter);
app.use("/item", itemRouter);

app.post("/upload", upload.single("image"), (req, res, next) => {
  return res.json({
    path: `/uploads/${req.file.filename}`,
  });
});

app.get("/", (req, res) => {});

app.get("*", (req, res) => {
  res.status(404).send("Page Not Found");
});

app.listen(PORT, () => {
  console.log(`listening on ${PORT}`);
});
