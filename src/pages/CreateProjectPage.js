import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CreateProjectPage.css';

const CreateProjectPage = () => {
  const navigate = useNavigate();

  const [currentStep, setCurrentStep] = useState(1);

  // States for project and project chief's data
  const [projectName, setProjectName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [projectDescription, setProjectDescription] = useState('');
  const [fullName, setFullName] = useState('');
  const [rfid, setRfid] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [domain, setDomain] = useState('');
  
  const [attachment, setAttachment] = useState(null); 

  const handleNextStep = () => {
    if (currentStep === 1) {
      if (!fullName || !rfid || !email || !phone || !birthDate || !domain) {
        alert('Please fill in all the fields for the project chief!');
        return;
      }
    } else if (currentStep === 2) {
      if (password !== confirmPassword) {
        alert('Passwords do not match!');
        return;
      }
      if (!projectName || !projectDescription) {
        alert('Please provide project name and description!');
        return;
      }
    }

    setCurrentStep(currentStep + 1);
  };

  const handlePreviousStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleCreateProject = () => {
    console.log('Project Created:', projectName);
    console.log('Team Chief:', fullName, rfid, email, phone, birthDate, domain);
    console.log('Project Description:', projectDescription);

    navigate('/'); 
  };

  return (
    <div className="create-project-container">
      <div className="create-project-box">
        <h2>{currentStep === 1 ? 'Step 1: Project Chief Information' : 'Step 2: Project Details'}</h2>
        
        <form onSubmit={(e) => e.preventDefault()}>
          {currentStep === 1 && (
            <div>
              <div className="input-group">
                <label htmlFor="fullName">Full Name (Project Chief)</label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  placeholder="Enter full name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
              </div>
              <div className="input-group">
                <label htmlFor="rfid">RFID (Project Chief)</label>
                <input
                  type="text"
                  id="rfid"
                  name="rfid"
                  placeholder="Enter RFID"
                  value={rfid}
                  onChange={(e) => setRfid(e.target.value)}
                  required
                />
              </div>
              <div className="input-group">
                <label htmlFor="email">Email (Project Chief)</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="input-group">
                <label htmlFor="phone">Phone (Project Chief)</label>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  placeholder="Enter phone number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>
              <div className="input-group">
                <label htmlFor="birthDate">Birth Date (Project Chief)</label>
                <input
                  type="date"
                  id="birthDate"
                  name="birthDate"
                  value={birthDate}
                  onChange={(e) => setBirthDate(e.target.value)}
                  required
                />
              </div>
              <div className="input-group">
                <label htmlFor="domain">Domain (Project Chief)</label>
                <input
                  type="text"
                  id="domain"
                  name="domain"
                  placeholder="Enter domain"
                  value={domain}
                  onChange={(e) => setDomain(e.target.value)}
                  required
                />
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div>
              <div className="input-group">
                <label htmlFor="projectName">Project Name</label>
                <input
                  type="text"
                  id="projectName"
                  name="projectName"
                  placeholder="Enter project name"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  required
                />
              </div>
              <div className="input-group">
                <label htmlFor="projectDescription">Project Description</label>
                <textarea
                  id="projectDescription"
                  name="projectDescription"
                  placeholder="Enter project description"
                  value={projectDescription}
                  onChange={(e) => setProjectDescription(e.target.value)}
                  required
                />
              </div>
              <div className="input-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="input-group">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="Confirm password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
              <div className="input-group">
                <label htmlFor="attachment">Attach Documents</label>
                <input
                  type="file"
                  id="attachment"
                  name="attachment"
                  onChange={(e) => setAttachment(e.target.files[0])}
                />
              </div>
            </div>
          )}

          <div className="navigation-buttons">
            {currentStep > 1 && (
              <button type="button" onClick={handlePreviousStep} className="previous-btn">
                Previous
              </button>
            )}
            {currentStep === 1 ? (
              <button type="button" onClick={handleNextStep} className="next-btn">
                Next
              </button>
            ) : (
              <button type="button" onClick={handleCreateProject} className="create-btn">
                Create Project
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
export default CreateProjectPage;
