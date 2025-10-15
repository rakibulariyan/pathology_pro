import React, { useState } from 'react';
import PatientList from '../components/patients/PatientList';
import PatientForm from '../components/patients/PatientForm';

const PatientManagement = () => {
  const [currentView, setCurrentView] = useState('list'); // 'list', 'form', 'history'
  const [selectedPatient, setSelectedPatient] = useState(null);

  const handleEditPatient = (patient) => {
    setSelectedPatient(patient);
    setCurrentView('form');
  };

  const handleViewHistory = (patient) => {
    setSelectedPatient(patient);
    setCurrentView('history');
    // In a real app, you'd fetch and display patient history
    alert(`Patient History for ${patient.name} would be displayed here.`);
  };

  const handleSavePatient = (patient) => {
    setCurrentView('list');
    setSelectedPatient(null);
    // In a real app, you might want to refresh the patient list
  };

  const handleCancel = () => {
    setCurrentView('list');
    setSelectedPatient(null);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Patient Management</h1>
        {currentView === 'list' && (
          <button
            onClick={() => handleEditPatient(null)}
            className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            Add New Patient
          </button>
        )}
      </div>

      {currentView === 'list' && (
        <PatientList 
          onEditPatient={handleEditPatient}
          onViewHistory={handleViewHistory}
        />
      )}

      {currentView === 'form' && (
        <PatientForm
          patient={selectedPatient}
          onSave={handleSavePatient}
          onCancel={handleCancel}
        />
      )}
    </div>
  );
};

export default PatientManagement;
