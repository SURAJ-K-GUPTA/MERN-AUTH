import express from "express";
import dotenv from "dotenv";
dotenv.config();
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";
import cookieParser from "cookie-parser";
import cors from "cors";
const port = process.env.PORT || 5000;
import userRoutes from "./routes/userRoutes.js";
import connectDB from "./config/db.js";
import path from "path";

connectDB();

const app = express();

// Enable CORS for all routes
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

if (process.env.NODE_ENV === "production") {
  const __dirname = path.resolve();
  app.use(express.static(path.join(__dirname, "dist")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "dist", "index.html"))
  );
}
else {
    app.get("/", (req, res) => res.send("Server is ready"));
}

app.use("/api/users", userRoutes);


app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));
