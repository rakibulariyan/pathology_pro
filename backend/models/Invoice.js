const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Invoice = sequelize.define('Invoice', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  invoice_number: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  order_id: {
    type: DataTypes.UUID,
    allowNull: false
  },
  patient_id: {
    type: DataTypes.UUID,
    allowNull: false
  },
  total_amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  tax_amount: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0
  },
  discount_amount: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0
  },
  final_amount: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  status: {
    type: DataTypes.ENUM('pending', 'paid', 'partial', 'overdue'),
    defaultValue: 'pending'
  },
  due_date: {
    type: DataTypes.DATEONLY
  }
}, {
  tableName: 'invoices',
  timestamps: true,
  underscored: true
});

module.exports = Invoice;
