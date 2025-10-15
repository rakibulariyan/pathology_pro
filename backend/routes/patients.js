const express = require('express');
const {
  getAllPatients,
  createPatient,
  getPatientById,
  updatePatient,
  getPatientHistory
} = require('../controllers/patientController');
const { authenticate, authorize } = require('../middleware/auth');

const router = express.Router();

router.use(authenticate);

router.get('/', getAllPatients);
router.post('/', createPatient);
router.get('/:id', getPatientById);
router.put('/:id', updatePatient);
router.get('/:id/history', getPatientHistory);

module.exports = router;
