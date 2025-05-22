const express = require("express");
const axios = require("axios");
const app = express();

app.use(express.json());

app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: "Missing credentials" });
  }

  try {
    const response = await axios.post("https://webshare.cz/api/login/", {
      username,
      password
    });

    if (response.data && response.data.session_id) {
      return res.json({ session_id: response.data.session_id });
    } else {
      return res.status(401).json({ error: "Login failed", data: response.data });
    }
  } catch (err) {
    return res.status(500).json({ error: "Internal error", details: err.message });
  }
});

module.exports = app;
