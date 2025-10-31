import React, { useState } from 'react';
import './style.css';

function Directory() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    district: 'all',
    type: 'all',
    governmentOnly: false
  });

  const [hospitals] = useState([
    {
      id: 1,
      name: "City General Hospital",
      status: "verified",
      address: "12 MG Road, Central",
      schemes: ["Ayushman Bharat"],
      type: "government",
      district: "central"
    },
    {
      id: 2,
      name: "Sunrise Private Clinic",
      status: "pending",
      address: "45 Green St",
      schemes: [],
      type: "private",
      district: "east"
    },
    {
      id: 3,
      name: "Apex Medical Centre",
      status: "verified",
      address: "88 River Lane",
      schemes: ["CGHS", "Ayushman Bharat"],
      type: "private",
      district: "west"
    },
    {
      id: 4,
      name: "Metro Healthcare Hub",
      status: "verified",
      address: "156 Station Road",
      schemes: ["CGHS", "ECHS"],
      type: "private",
      district: "central"
    },
    {
      id: 5,
      name: "District Hospital",
      status: "verified",
      address: "34 Government Complex",
      schemes: ["Ayushman Bharat", "CGHS", "ECHS"],
      type: "government",
      district: "east"
    }
  ]);

  // Filter hospitals based on search and filters
  const filteredHospitals = hospitals.filter(hospital => {
    const matchesSearch = hospital.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         hospital.address.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDistrict = filters.district === 'all' || hospital.district === filters.district;
    const matchesType = filters.type === 'all' || hospital.type === filters.type;
    const matchesGovernment = !filters.governmentOnly || hospital.type === 'government';

    return matchesSearch && matchesDistrict && matchesType && matchesGovernment;
  });

  const handleFilterChange = (name, value) => {
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <section id="directory-page" className="container">
      <h1>Verified Hospital Directory</h1>
      <p className="intro-text">Find verified hospitals and the schemes they support.</p>

      <div className="filter-bar">
        <div className="search-box">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#999" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input 
            type="text" 
            placeholder="Search hospitals"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="filter-group">
          <select 
            name="district" 
            value={filters.district}
            onChange={(e) => handleFilterChange('district', e.target.value)}
          >
            <option value="all">All Districts</option>
            <option value="central">Central</option>
            <option value="east">East</option>
            <option value="west">West</option>
          </select>
        </div>

        <div className="filter-group">
          <select 
            name="type" 
            value={filters.type}
            onChange={(e) => handleFilterChange('type', e.target.value)}
          >
            <option value="all">All Types</option>
            <option value="private">Private</option>
            <option value="government">Government</option>
          </select>
        </div>

        <div className="filter-group checkbox-group">
          <input 
            type="checkbox" 
            id="gov-only" 
            checked={filters.governmentOnly}
            onChange={(e) => handleFilterChange('governmentOnly', e.target.checked)}
          />
          <label htmlFor="gov-only">Government Only</label>
        </div>
      </div>

      <div className="directory-layout">
        <div className="hospital-list">
          {filteredHospitals.map(hospital => (
            <div key={hospital.id} className={`hospital-card ${hospital.status}`}>
              <div className="card-header">
                <h3>{hospital.name}</h3>
                {hospital.status === "verified" ? (
                  <div className="status-icon verified">✓</div>
                ) : (
                  <div className="status-tag pending">Pending</div>
                )}
              </div>
              <p className="address">{hospital.address}</p>
              <p className="schemes">
                {hospital.schemes.length > 0 
                  ? hospital.schemes.join(' • ') 
                  : 'No listed schemes'}
              </p>
              <div className="hospital-type-tag">
                {hospital.type === 'government' ? 'Government' : 'Private'}
              </div>
            </div>
          ))}
        </div>

        <div className="directory-map">
          <h2>Map</h2>
          <div className="map-placeholder-large">
            <p>Map with cluster markers</p>
            <p className="map-coming-soon">Interactive map coming soon!</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Directory;