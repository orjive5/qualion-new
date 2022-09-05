const router = require('express').Router();
const checkAuth = require('../utils/checkAuth');
const PostController = require('../controllers/PostController');
const {
  postCreateValidation,
  postUpdateValidation,
} = require('../validations');

router.get('/', PostController.getAll);
router.get('/:id', PostController.getOne);
router.post('/', checkAuth, postCreateValidation, PostController.create);
router.delete('/:id', checkAuth, PostController.remove);
router.put('/:id', checkAuth, postUpdateValidation, PostController.update);

module.exports = router;
