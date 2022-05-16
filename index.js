const express = require("express");
const userRoutes = require("./src/routes/users");
const authRoutes = require("./src/routes/auth");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");

dotenv.config();

const app = express();
const port = process.env.PORT || 4001;
const corsOptions = { credentails: true, origin: process.env.URL || "*" };

// middlewares
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// routes
app.get("/", (req, res) => {
  res.send("Welcome to ...");
});

app.use("/api/v1/users", userRoutes);
app.use("/api/v1/auth", authRoutes);

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
