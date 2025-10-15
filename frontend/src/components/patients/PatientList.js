import React, { useState, useEffect } from 'react';
import SearchBar from '../common/SearchBar';
import api from '../../utils/api';

const PatientList = ({ onEditPatient, onViewHistory }) => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] =
