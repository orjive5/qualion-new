const { body } = require('express-validator');

const postCreateValidation = [
    body('title', 'Enter valid post title!').isLength({ min: 3 }).isString(),
    body('text', 'Enter valid post text!').isLength({ min: 10 }).isString(),
    body('imageUrl', 'Enter valid image url!').optional().isString(),
    body('tags', 'Enter valid tag').optional().isString(),
]

module.exports = {
    postCreateValidation,
}