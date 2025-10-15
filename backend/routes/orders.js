const express = require('express');
const {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrderStatus
} = require('../controllers/orderController');
const { authenticate, authorize } = require('../middleware/auth');

const router = express.Router();

router.use(authenticate);

router.get('/', getAllOrders);
router.post('/', createOrder);
router.get('/:id', getOrderById);
router.put('/:id/status', updateOrderStatus);

module.exports = router;
