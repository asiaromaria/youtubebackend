const mongoose = require("mongoose");
const Joi = require('joi');

const replySchema = new mongoose.Schema({
  userName: { type: String, maxlength: 150 },
  userComment: { type: String, maxlength: 150 },
});

const commentSchema = new mongoose.Schema({

  userName: { type: String, required: true, minlength: 1, maxlength: 150 },
  userComment: { type: String, required: true, minlength: 1, maxlength: 150 },
  likes: { type: Number},
  dislikes: { type: Number},
  replies: [replySchema]
});


const Comment = mongoose.model('Comment', commentSchema);
const Reply = mongoose.model('Reply', replySchema);

function validateComment (comment){
  const schema = Joi.object({
    userName: Joi.string().min(1).max(150).required(),
    userComment: Joi.string().min(1).max(150).required(),
    likes: Joi.number(),
    dislikes: Joi.number(),
    replies: Joi.array(),
    

  });

  return schema.validate(comment);
};

function validateReply (reply){
  const schema = Joi.object({
    userName: Joi.string().min(1).max(150).required(),
    userComment: Joi.string().min(1).max(150).required()
  })
  return schema.validate(reply);
};

exports.Reply=Reply;
exports.Comment = Comment;
exports.validate = validateComment;
exports.validateReply= validateReply;
exports.commentSchema = commentSchema;
exports.replySchema = replySchema;

