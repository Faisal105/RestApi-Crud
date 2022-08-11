const joi = require('joi');

const TaskValidation = joi.object({
	todo: joi.string().min(3).max(200).required(),
	done: joi.bool().required(),
});
module.exports = TaskValidation;
