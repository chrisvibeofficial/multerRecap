const { createUser, updateUser } = require('../controllers/userController');
const router = require('express').Router();
const upload = require('../utils/multer');

router.post('/user', upload.array('IMG', 5), createUser);
router.put('/user/:id', upload.array('IMG', 5), updateUser);

module.exports = router