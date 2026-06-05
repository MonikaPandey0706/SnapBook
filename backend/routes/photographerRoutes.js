const express = require("express");
const Photographer = require("../models/Photographer");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const photographers = await Photographer.find();
    res.json(photographers);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

router.post("/", async (req, res) => {
  try {
    console.log("Received photographer data:", req.body);

    const photographer = await Photographer.create(req.body);

    res.json({
      message: "Photographer added successfully",
      photographer
    });
  } catch (error) {
    console.log("Photographer add error:", error.message);

    res.status(500).json({
      message: error.message
    });
  }
});

module.exports = router;