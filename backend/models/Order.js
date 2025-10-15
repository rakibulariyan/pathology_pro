const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Order = sequelize.define('Order', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  lab_id: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  patient_id: {
    type: DataTypes.UUID,
    allowNull: false
  },
  receptionist_id: {
    type: DataTypes.UUID,
    allowNull: false
  },
  total_amount: {
    type: DataTypes.DECIMAL(10, 2)
  },
  status: {
    type: DataTypes.ENUM(
      'registered',
      'sample_collected',
      'sent_to_lab',
      'under_analysis',
      'report_ready',
      'delivered'
    ),
    defaultValue: 'registered'
  },
  order_date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  completed_date: {
    type: DataTypes.DATE
  }
}, {
  tableName: 'orders',
  timestamps: true,
  underscored: true
});

module.exports = Order;
