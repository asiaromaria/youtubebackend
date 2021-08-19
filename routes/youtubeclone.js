const { Youtubeclone, validate } = require("../models/youtubeclone");
const express = require("express");
const router = express.Router();

// All endpoints and route handlers go here

router.post("/", async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error);

    const youtubeclone = new Youtubeclone({
      videoTitle: req.body.videoTitle,
      description: req.body.description,

    });

    await youtubeclone.save();

    return res.send(youtubeclone);
  } catch (ex) {
    return res.status(500).send(`Internal Server Error: ${ex}`);
  }
});


router.get("/", async (req, res) => {
  try {
    const youtubeclone = await Youtubeclone.find();
    return res.send(youtubeclone);

  } catch (ex) {
    return res.status(500).send(`Internal Server Error: ${ex}`);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const youtubeclone = await youtubeclone.findById(req.params.id);
    if (!youtubeclone)
      return res.status(400).send(`The card with id "${req.params.id}" dos not exist in the deck.`);

    return res.send(youtubeclone);
    
  } catch (ex) {
    return res.status(500).send(`Internal Server Error: ${ex}`);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error);

    const youtubeclone = await Youtubeclone.findByIdAndUpdate(
req.params.id,
      {
        videoTitle: req.body.videoTitle,
        description: req.body.description,
  

      },
      { new: true }
    );
    if (!youtubeclone)
      return res
        .status(400)
        .send(`The card with id "${req.params.id}" dos not exist in the deck.`);
    await youtubeclone.save();
    return res.send(youtubeclone);
  } catch (ex) {
    return res.status(500).send(`Internal Server Error: ${ex}`);
  }
});


router.delete("/:id", async (req, res) => {
  try {
    const youtubeclone = await Youtubeclone.findByIdAndRemove(req.params.id);
    if (!youtubeclone)
      return res
        .status(400)
        .send(`The card with id "${req.params.id}" dos not exist in the deck.`);
        return res.send(youtubeclone);
  } catch (ex) {
    return res.status(500).send(`Internal Server Error: ${ex}`);
  }
});

module.exports = router;
