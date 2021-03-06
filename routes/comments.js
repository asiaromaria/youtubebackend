const { Comment, Reply, validateComment, validateReply } = require("../models/comments");
const express = require("express");
const router = express.Router();

// All endpoints and route handlers go here
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

router.post("/", async (req, res) => {
  try {
    console.log("Hit post")
    const { error } = validateComment(req.body);
    if (error) return res.status(400).send(error);
    console.log("validate succeed")
    const comment = new Comment({
      userName: req.body.userName,
      userComment: req.body.userComment,
      likes: 0,
      dislikes: 0,
      replies: [],
    });
    console.log("Comment created")
    await comment.save();

    return res.send(comment);
  } catch (ex) {
    return res.status(500).send(`Internal Server Error: ${ex}`);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const { error } = validateComment(req.body);
    if (error) return res.status(400).send(error);

    const comment = await Comment.findByIdAndUpdate(
req.params.id,
      {
        userName: req.body.userName,
        userComment: req.body.userComment,
       

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


// reply
router.post("/:id", async (req, res) => {

  try {
    const comment = await Comment.findByIdAndUpdate(req.params.id)
    const { error } = validateReply(req.body);
    if (error) return res.status(400).send(error);

    const reply = new Reply({
      userName: req.body.userName,
      userComment: req.body.userComment,
     
    });

    comment.replies.push(reply)
    await comment.save();

    return res.send(comment);
  } catch (ex) {
    return res.status(500).send(`Internal Server Error: ${ex}`);
  }
});



router.post("/:id", async (req, res) => {
  try {
    console.log("Hit Post")
    const comment = await Comment.findByIdAndUpdate(req.params.id)
    console.log("comment found")
    const { error } = validateReply(req.body);
    if (error) return res.status(400).send(error);
    const reply = new Reply({
      userName: req.body.userName,
      userComment: req.body.userComment,
    });
    console.log("reply created")
    comment.replies.push(reply)
    console.log("reply pushed")
    await comment.save();
    return res.send(comment);
  } catch (ex) {
    return res.status(500).send(`Internal Server Error: ${ex}`);
  }
});

// router.post("/:id", async (req, res) => {
//   try {
//     const { error } = validateReply(req.body);
//     if (error) return res.status(400).send(error);

//     const reply = new Reply({
//       userName: req.body.userName,
//       userComment: req.body.userComment,
    

//     });

//     await comment.save();

//     return res.send(comment);
//   } catch (ex) {
//     return res.status(500).send(`Internal Server Error: ${ex}`);
//   }
// });



module.exports = router;
