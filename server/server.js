require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
const router = require("./router/auth-router");
const connectDb = require("./utils/db");
const errorMiddleware = require("./middlewares/error-middleware");
const serviceRoute = require("./router/service-router");
const adminRouter = require("./router/admin-router");

// CORS Configuration
const corsOptions = {
  origin: ["http://localhost:5173", "https://d1a64x3q3ktxtv.cloudfront.net"],
  methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

// Routes
app.use("/api/auth", router);
app.use("/api/data", serviceRoute);
app.use("/api/admin", adminRouter);

// Root Route to Test Connection
app.get("/", (req, res) => {
  res.send("Backend connected successfully");
});

// Error Handling Middleware
app.use(errorMiddleware);

const PORT = 5000;

// Connect to Database and Start HTTP Server
connectDb().then(() => {
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
});
