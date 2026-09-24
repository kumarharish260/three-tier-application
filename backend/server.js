const express = require("express");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.get("/api/health", (req, res) => {
    res.json({
        status: "UP",
        service: "backend"
    });
});

app.get("/api/message", (req, res) => {
    res.json({
        message: "Three Tier Application is running"
    });
});

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Backend server running on port ${PORT}`);
});
