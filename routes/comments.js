const { Comment, validate } = require("../models/comments");
const express = require("express");
const router = express.Router();

// All endpoints and route handlers go here

router.post("/", async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error);

    const comment = new Comment({
      userName: req.body.userName,
      userComment: req.body.userComment,
    //   answer: req.body.answer,

    });

    await comment.save();

    return res.send(comment);
  } catch (ex) {
    return res.status(500).send(`Internal Server Error: ${ex}`);
  }
});


router.get("/", async (req, res) => {
  try {
    const comments = await Comment.find();
    return res.send(comments);

  } catch (ex) {
    return res.status(500).send(`Internal Server Error: ${ex}`);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment)
      return res.status(400).send(`The card with id "${req.params.id}" dos not exist in the deck.`);

    return res.send(comment);
    
  } catch (ex) {
    return res.status(500).send(`Internal Server Error: ${ex}`);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error);

    const comment = await Comment.findByIdAndUpdate(
req.params.id,
      {
        userName: req.body.userName,
        userComment: req.body.userComment,
        // answer: req.body.answer,

      },
      { new: true }
    );
    if (!comment)
      return res
        .status(400)
        .send(`The card with id "${req.params.id}" dos not exist in the deck.`);
    await comment.save();
    return res.send(comment);
  } catch (ex) {
    return res.status(500).send(`Internal Server Error: ${ex}`);
  }
});


router.delete("/:id", async (req, res) => {
  try {
    const comment = await Comment.findByIdAndRemove(req.params.id);
    if (!comment)
      return res
        .status(400)
        .send(`The card with id "${req.params.id}" dos not exist in the deck.`);
        return res.send(comment);
  } catch (ex) {
    return res.status(500).send(`Internal Server Error: ${ex}`);
  }
});

module.exports = router;
