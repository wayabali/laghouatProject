import React, { useState } from 'react';
import { Button, Typography, Container, Box, Modal, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import emailjs from 'emailjs-com'; // Import EmailJS for emailing
import './PortalHomePage.css'; 

const PortalHomePage = ({ portal }) => {
  const navigate = useNavigate();
  const [openDetailsModal, setOpenDetailsModal] = useState(false);
  const [openSendTrainingModal, setOpenSendTrainingModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [trainingDate, setTrainingDate] = useState('');
  const [trainingFile, setTrainingFile] = useState(null);

//test static
  const projects = [
    { id: 1, name: "Cosmetics Idea", status: "Submitted", description: "Project related to Cosmetics", team: ["John Doe", "Jane Doe"], documents: null, department: "CDE" },
    { id: 2, name: "E-Learning Plateform", status: "Submitted", description: "Mixing Learning with Internet", team: ["Alice", "Bob"], documents: "link_to_document", department: "BI" },
  ];

  const handleOpenDetailsModal = (project) => {
    setSelectedProject(project);
    setOpenDetailsModal(true);
  };

  const handleCloseDetailsModal = () => {
    setOpenDetailsModal(false);
  };

  const handleOpenSendTrainingModal = () => {
    if (!selectedProject) {
      alert("No project selected!");
      return;
    }
    setOpenSendTrainingModal(true);
  };

  const handleCloseSendTrainingModal = () => {
    setOpenSendTrainingModal(false);
  };

  const handleSendTraining = () => {
    if (!trainingFile || !trainingDate) {
      alert('Please select both the training file and the training date.');
      return;
    }

    const formData = new FormData();
    formData.append('trainingFile', trainingFile);

    const emailData = {
      to_email: 'mehdibendimerad23@gmail.com', // Replace with the recipient's email
      project_name: selectedProject.name,
      training_date: trainingDate,
      project_description: selectedProject.description,
      team_members: selectedProject.team.join(', '),
      training_file: trainingFile.name,
    };

    emailjs.send("service_4fbhowd","template_vxxb2hk" ,emailData,'HAWJHvoBp5ONM_1jJ')
      .then((response) => {
        console.log('Email sent successfully:', response);
        alert(`Training has been sent to ${selectedProject.name}'s project leader.`);
        setOpenSendTrainingModal(false);
      })
      .catch((error) => {
        console.log('Error sending email:', error);
        alert('Failed to send the email.');
      });
  };

  return (
    <div>
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 4 }}>
          {portal} Portal Home
        </Typography>

        {projects.map((project) => (
          <div className="project-card" key={project.id} style={{ padding: '20px', marginBottom: '10px', border: '1px solid #ccc', borderRadius: '8px' }}>
            <div className="project-card-header" style={{ display: 'flex', justifyContent: 'space-between' }}>
              <h3>{project.name}</h3>
              <span className={`status ${project.status.toLowerCase()}`} style={{ fontWeight: 'bold' }}>
                {project.status}
              </span>
            </div>
            <p>{project.description}</p>
            <div className="project-actions">
              <Button onClick={() => handleOpenDetailsModal(project)} variant="outlined" color="primary">
                View Details
              </Button>
              <Button onClick={handleOpenSendTrainingModal} variant="outlined" color="secondary" sx={{ ml: 2 }}>
                Send Training
              </Button>
            </div>
          </div>
        ))}

        <Modal open={openDetailsModal} onClose={handleCloseDetailsModal}>
          <Box sx={{
            backgroundColor: 'white',
            padding: 4,
            borderRadius: 2,
            maxWidth: 600,
            width: '100%',
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}>
            <Typography variant="h6" sx={{ marginBottom: 2, fontWeight: 'bold' }}>
              Project Details: {selectedProject?.name}
            </Typography>

            <div className="project-details-modal-body" style={{ marginBottom: '20px' }}>
              <Typography variant="body1"><strong>Description:</strong> {selectedProject?.description}</Typography>
              <Typography variant="body1"><strong>Team:</strong> {selectedProject?.team.join(', ')}</Typography>
              <Typography variant="body1"><strong>Documents:</strong> {selectedProject?.documents ? <a href={selectedProject?.documents} target="_blank" rel="noopener noreferrer">View Document</a> : 'None'}</Typography>
            </div>

            <div className="project-details-modal-footer" style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button variant="contained" color="primary" onClick={handleOpenSendTrainingModal} style={{ width: '48%' }}>
                Send Training
              </Button>
              <Button variant="outlined" color="primary" onClick={handleCloseDetailsModal} style={{ width: '48%' }}>
                Close
              </Button>
            </div>
          </Box>
        </Modal>

        <Modal open={openSendTrainingModal} onClose={handleCloseSendTrainingModal}>
          <Box sx={{
            backgroundColor: 'white',
            padding: 4,
            borderRadius: 2,
            maxWidth: 600,
            width: '100%',
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}>
            <Typography variant="h6" sx={{ marginBottom: 2, fontWeight: 'bold' }}>
              Send Training to {selectedProject?.name}
            </Typography>

            <TextField
              fullWidth
              label="Training Date"
              variant="outlined"
              margin="normal"
              type="date"
              value={trainingDate}
              onChange={(e) => setTrainingDate(e.target.value)}
              InputLabelProps={{ shrink: true }}
              style={{ marginBottom: '20px' }}
            />
            <TextField
              fullWidth
              label="Training File"
              variant="outlined"
              margin="normal"
              type="file"
              onChange={(e) => setTrainingFile(e.target.files[0])} // Set the selected file here
              style={{ marginBottom: '20px' }}
            />

            <div className="send-training-modal-footer" style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button variant="contained" color="primary" onClick={handleSendTraining} style={{ width: '48%' }}>
                Send
              </Button>
              <Button variant="outlined" color="secondary" onClick={handleCloseSendTrainingModal} style={{ width: '48%' }}>
                Cancel
              </Button>
            </div>
          </Box>
        </Modal>
      </Container>
    </div>
  );
};

export default PortalHomePage;
