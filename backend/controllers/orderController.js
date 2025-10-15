const { Order, OrderItem, Patient, Test, User } = require('../models');
const { generateLabId } = require('../utils/generateId');

const createOrder = async (req, res) => {
  try {
    const { patient_id, tests, receptionist_id } = req.body;

    // Generate lab ID
    const lab_id = await generateLabId();

    // Calculate total amount
    const testRecords = await Test.findAll({
      where: { id: tests, is_active: true }
    });

    const total_amount = testRecords.reduce((sum, test) => sum + parseFloat(test.price), 0);

    // Create order
    const order = await Order.create({
      lab_id,
      patient_id,
      receptionist_id: req.user.id,
      total_amount
    });

    // Create order items
    const orderItems = tests.map(test_id => ({
      order_id: order.id,
      test_id
    }));

    await OrderItem.bulkCreate(orderItems);

    // Fetch complete order with relationships
    const completeOrder = await Order.findByPk(order.id, {
      include: [
        {
          model: Patient,
          as: 'patient'
        },
        {
          model: OrderItem,
          as: 'orderItems',
          include: [
            {
              model: Test,
              as: 'test'
            }
          ]
        }
      ]
    });

    res.status(201).json({
      message: 'Order created successfully',
      order: completeOrder
    });
  } catch (error) {
    console.error('Create order error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const { page = 1, limit = 10, status } = req.query;
    const offset = (page - 1) * limit;

    const whereCondition = {};
    if (status) {
      whereCondition.status = status;
    }

    const { count, rows: orders } = await Order.findAndCountAll({
      where: whereCondition,
      include: [
        {
          model: Patient,
          as: 'patient',
          attributes: ['id', 'patient_id', 'name', 'phone']
        },
        {
          model: User,
          as: 'receptionist',
          attributes: ['id', 'name']
        }
      ],
      order: [['created_at', 'DESC']],
      limit: parseInt(limit),
      offset: parseInt(offset)
    });

    res.json({
      orders,
      totalPages: Math.ceil(count / limit),
      currentPage: parseInt(page),
      totalOrders: count
    });
  } catch (error) {
    console.error('Get orders error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Order.findByPk(id, {
      include: [
        {
          model: Patient,
          as: 'patient'
        },
        {
          model: User,
          as: 'receptionist',
          attributes: ['id', 'name']
        },
        {
          model: OrderItem,
          as: 'orderItems',
          include: [
            {
              model: Test,
              as: 'test'
            },
            {
              model: User,
              as: 'pathologist',
              attributes: ['id', 'name']
            }
          ]
        }
      ]
    });

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.json({ order });
  } catch (error) {
    console.error('Get order error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const order = await Order.findByPk(id);
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    await order.update({ status });

    res.json({
      message: 'Order status updated successfully',
      order
    });
  } catch (error) {
    console.error('Update order status error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  createOrder,
  getAllOrders,
  getOrderById,
  updateOrderStatus
};
