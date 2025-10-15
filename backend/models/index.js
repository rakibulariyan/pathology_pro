const sequelize = require('../config/database');
const User = require('./User');
const Patient = require('./Patient');
const Test = require('./Test');
const Order = require('./Order');
const OrderItem = require('./OrderItem');
const Invoice = require('./Invoice');
const Payment = require('./Payment');
const InventoryItem = require('./InventoryItem');
const Supplier = require('./Supplier');
const Activity = require('./Activity');

// Define associations
User.hasMany(Order, { foreignKey: 'receptionist_id', as: 'orders' });
Order.belongsTo(User, { foreignKey: 'receptionist_id', as: 'receptionist' });

Patient.hasMany(Order, { foreignKey: 'patient_id', as: 'orders' });
Order.belongsTo(Patient, { foreignKey: 'patient_id', as: 'patient' });

Order.hasMany(OrderItem, { foreignKey: 'order_id', as: 'orderItems' });
OrderItem.belongsTo(Order, { foreignKey: 'order_id', as: 'order' });

Test.hasMany(OrderItem, { foreignKey: 'test_id', as: 'orderItems' });
OrderItem.belongsTo(Test, { foreignKey: 'test_id', as: 'test' });

User.hasMany(OrderItem, { foreignKey: 'pathologist_id', as: 'assignedTests' });
OrderItem.belongsTo(User, { foreignKey: 'pathologist_id', as: 'pathologist' });

Order.hasOne(Invoice, { foreignKey: 'order_id', as: 'invoice' });
Invoice.belongsTo(Order, { foreignKey: 'order_id', as: 'order' });

Patient.hasMany(Invoice, { foreignKey: 'patient_id', as: 'invoices' });
Invoice.belongsTo(Patient, { foreignKey: 'patient_id', as: 'patient' });

Invoice.hasMany(Payment, { foreignKey: 'invoice_id', as: 'payments' });
Payment.belongsTo(Invoice, { foreignKey: 'invoice_id', as: 'invoice' });

Supplier.hasMany(InventoryItem, { foreignKey: 'supplier_id', as: 'inventoryItems' });
InventoryItem.belongsTo(Supplier, { foreignKey: 'supplier_id', as: 'supplier' });

User.hasMany(Activity, { foreignKey: 'user_id', as: 'activities' });
Activity.belongsTo(User, { foreignKey: 'user_id', as: 'user' });

module.exports = {
  sequelize,
  User,
  Patient,
  Test,
  Order,
  OrderItem,
  Invoice,
  Payment,
  InventoryItem,
  Supplier,
  Activity
};
