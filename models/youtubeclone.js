const mongoose = require("mongoose");
const Joi = require('joi');


const youtubecloneSchema = new mongoose.Schema({
  question: { type: String, required: true, minlength: 2, maxlength: 150 },
  answer: { type: String, required: true },
  
});
const Youtubeclone = mongoose.model('Youtubeclone', youtubecloneSchema);

function validateYoutubeclone (youtubeclone){
  const schema = Joi.object({
    question: Joi.string().min(2).max(150).required(),
    answer:Joi.string().required(),

  });
  return schema.validate(youtubeclone);
}


exports.Youtubeclone = Youtubeclone;
exports.validate=validateYoutubeclone;
exports.youtubecloneSchema=youtubecloneSchema;

