const { Patient, Order, OrderItem, Test } = require('../models');
const { generatePatientId } = require('../utils/generateId');
const { Op } = require('sequelize');

const getAllPatients = async (req, res) => {
  try {
    const { page = 1, limit = 10, search = '' } = req.query;
    const offset = (page - 1) * limit;

    const whereCondition = {};
    if (search) {
      whereCondition[Op.or] = [
        { name: { [Op.iLike]: `%${search}%` } },
        { patient_id: { [Op.iLike]: `%${search}%` } },
        { phone: { [Op.iLike]: `%${search}%` } }
      ];
    }

    const { count, rows: patients } = await Patient.findAndCountAll({
      where: whereCondition,
      order: [['created_at', 'DESC']],
      limit: parseInt(limit),
      offset: parseInt(offset)
    });

    res.json({
      patients,
      totalPages: Math.ceil(count / limit),
      currentPage: parseInt(page),
      totalPatients: count
    });
  } catch (error) {
    console.error('Get patients error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const createPatient = async (req, res) => {
  try {
    const patientData = req.body;
    patientData.patient_id = await generatePatientId();

    const patient = await Patient.create(patientData);

    res.status(201).json({
      message: 'Patient created successfully',
      patient
    });
  } catch (error) {
    console.error('Create patient error:', error);
    if (error.name === 'SequelizeValidationError') {
      return res.status(400).json({ error: error.errors[0].message });
    }
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getPatientById = async (req, res) => {
  try {
    const { id } = req.params;
    const patient = await Patient.findByPk(id);

    if (!patient) {
      return res.status(404).json({ error: 'Patient not found' });
    }

    res.json({ patient });
  } catch (error) {
    console.error('Get patient error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const updatePatient = async (req, res) => {
  try {
    const { id } = req.params;
    const patientData = req.body;

    const patient = await Patient.findByPk(id);
    if (!patient) {
      return res.status(404).json({ error: 'Patient not found' });
    }

    await patient.update(patientData);

    res.json({
      message: 'Patient updated successfully',
      patient
    });
  } catch (error) {
    console.error('Update patient error:', error);
    if (error.name === 'SequelizeValidationError') {
      return res.status(400).json({ error: error.errors[0].message });
    }
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getPatientHistory = async (req, res) => {
  try {
    const { id } = req.params;

    const orders = await Order.findAll({
      where: { patient_id: id },
      include: [
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
      ],
      order: [['order_date', 'DESC']]
    });

    res.json({ orders });
  } catch (error) {
    console.error('Get patient history error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = {
  getAllPatients,
  createPatient,
  getPatientById,
  updatePatient,
  getPatientHistory
};
