const mongoose = require("mongoose");
const Joi = require('joi');

const replySchema = new mongoose.Schema({
  userName: { type: String, maxlength: 150 },
  userComment: { type: String, maxlength: 150 },
});

const commentSchema = new mongoose.Schema({

  userName: { type: String, required: true, minlength: 2, maxlength: 150 },
  userComment: { type: String, required: true, minlength: 2, maxlength: 150 },
  likes: { type: Number},
  dislikes: { type: Number},
  replies: [replySchema]
});


const Comment = mongoose.model('Comment', commentSchema);
// const Reply = mongoose.model('Reply', replySchema);

function validateComment (comment){
  const schema = Joi.object({
    userName: Joi.string().min(2).max(150).required(),
    userComment: Joi.string().min(2).max(150).required(),
    likes: Joi.number(),
    dislikes: Joi.number(),
    replies: Joi.replySchema,
    

  });

  return schema.validate(comment);
}



exports.Comment = Comment;
exports.validate = validateComment;
exports.commentSchema = commentSchema;
exports.replySchema = replySchema;

