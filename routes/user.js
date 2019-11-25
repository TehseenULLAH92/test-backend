// Filename: user.js
const router = require('express').Router();  // Initialize express router
// Import user controller
const userController = require('../controllers/userController');
// Set default API response
router.get('/', function (req, res) {
    res.json({
        status: 'API Its Working',
        message: 'Welcome to RestAPI!'
    });
});
// User routes
router.route('/users')
    .get(userController.index)
router.route('/user/new')
    .post(userController.new);
router.route('/user/:id')
    .get(userController.view)
    .patch(userController.update)
    .delete(userController.delete);
// Export API routes
module.exports = router;