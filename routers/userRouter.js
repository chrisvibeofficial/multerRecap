const { createUser, updateUser, getAll, getOneUser, deleteUser } = require('../controllers/userController');
const router = require('express').Router();
const upload = require('../utils/multer');

router.post('/user', upload.array('IMG', 5), createUser);
router.put('/user/:id', upload.array('IMG', 5), updateUser);
router.get('/user', getAll);
router.get('/user/:id', getOneUser);
router.delete('/user/:id', deleteUser);

module.exports = router