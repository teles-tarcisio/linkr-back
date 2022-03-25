import Joi from 'joi';

const hashtagSchema = Joi.object({
  hashtags: Joi.array().items(Joi.string()).required()
});

export default hashtagSchema;
