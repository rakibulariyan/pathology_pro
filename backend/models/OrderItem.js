const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const OrderItem = sequelize.define('OrderItem', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  order_id: {
    type: DataTypes.UUID,
    allowNull: false
  },
  test_id: {
    type: DataTypes.UUID,
    allowNull: false
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
  result_value: {
    type: DataTypes.TEXT
  },
  result_notes: {
    type: DataTypes.TEXT
  },
  normal_range: {
    type: DataTypes.TEXT
  },
  pathologist_id: {
    type: DataTypes.UUID
  },
  verified_at: {
    type: DataTypes.DATE
  }
}, {
  tableName: 'order_items',
  timestamps: true,
  underscored: true
});

module.exports = OrderItem;
