import express from "express";
import bodyParser from "body-parser";
import fs from "fs";
import cors from "cors";

const app = express();
const PORT = 5001;

// ✅ Configure CORS properly
app.use(cors({
  origin: "*",            // allow all origins
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type"],
}));

// ✅ Handle preflight requests explicitly (important for some setups)
app.options("*", cors());

// Middleware
app.use(bodyParser.json());

// Save email endpoint
app.post("/api/notify", (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  fs.appendFile("emails.txt", email + "\n", (err) => {
    if (err) {
      console.error("Error saving email:", err);
      return res.status(500).json({ error: "Could not save email" });
    }
    console.log("Saved email:", email);
    res.json({ message: "Email saved successfully!" });
  });
});

// Default route
app.get("/", (req, res) => {
  res.send("Server is running 🚀");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
