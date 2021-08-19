const mongoose = require("mongoose");
const Joi = require('joi');


const commentSchema = new mongoose.Schema({
  userName: { type: String, required: true, minlength: 2, maxlength: 150 },
  userComment: { type: String, required: true, minlength: 2, maxlength: 150 },
//   answer: { type: String, required: true },
  
});
const Comment = mongoose.model('Comment', commentSchema);

function validateComment (comment){
  const schema = Joi.object({
    userName: Joi.string().min(2).max(150).required(),
    userComment: Joi.string().min(2).max(150).required(),
    // answer:Joi.string().required(),

  });
  return schema.validate(comment);
}


exports.Comment = Comment;
exports.validate=validateComment;
exports.commentSchema=commentSchema;

