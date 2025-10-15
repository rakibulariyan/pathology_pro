const { Order, Patient, Invoice } = require('../models');
const { Op } = require('sequelize');

const generatePatientId = async () => {
  const today = new Date();
  const dateStr = today.toISOString().slice(0, 10).replace(/-/g, '');
  const prefix = `PAT-${dateStr}-`;
  
  const lastPatient = await Patient.findOne({
    where: {
      patient_id: {
        [Op.like]: `${prefix}%`
      }
    },
    order: [['patient_id', 'DESC']]
  });

  let sequence = 1;
  if (lastPatient) {
    const lastSeq = parseInt(lastPatient.patient_id.split('-')[2]);
    sequence = lastSeq + 1;
  }

  return `${prefix}${sequence.toString().padStart(3, '0')}`;
};

const generateLabId = async () => {
  const today = new Date();
  const dateStr = today.toISOString().slice(0, 10).replace(/-/g, '');
  const prefix = `LAB-${dateStr}-`;
  
  const lastOrder = await Order.findOne({
    where: {
      lab_id: {
        [Op.like]: `${prefix}%`
      }
    },
    order: [['lab_id', 'DESC']]
  });

  let sequence = 1;
  if (lastOrder) {
    const lastSeq = parseInt(lastOrder.lab_id.split('-')[2]);
    sequence = lastSeq + 1;
  }

  return `${prefix}${sequence.toString().padStart(3, '0')}`;
};

const generateInvoiceNumber = async () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = (today.getMonth() + 1).toString().padStart(2, '0');
  const prefix = `INV-${year}${month}-`;
  
  const lastInvoice = await Invoice.findOne({
    where: {
      invoice_number: {
        [Op.like]: `${prefix}%`
      }
    },
    order: [['invoice_number', 'DESC']]
  });

  let sequence = 1;
  if (lastInvoice) {
    const lastSeq = parseInt(lastInvoice.invoice_number.split('-')[2]);
    sequence = lastSeq + 1;
  }

  return `${prefix}${sequence.toString().padStart(4, '0')}`;
};

module.exports = {
  generatePatientId,
  generateLabId,
  generateInvoiceNumber
};
