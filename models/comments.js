const mongoose = require("mongoose");
const Joi = require('joi');


const commentSchema = new mongoose.Schema({
  usercomment: { type: String, required: true, minlength: 2, maxlength: 150 },
//   answer: { type: String, required: true },
  
});
const Comment = mongoose.model('Comment', commentSchema);

function validateComment (comment){
  const schema = Joi.object({
    usercomment: Joi.string().min(2).max(150).required(),
    // answer:Joi.string().required(),

  });
  return schema.validate(comment);
}


exports.Comment = Comment;
exports.validate=validateComment;
exports.commentSchema=commentSchema;

