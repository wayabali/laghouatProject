import React, { useState } from 'react';
import { Button, Typography, Container, Box, Modal, MenuItem, Select, FormControl, InputLabel } from '@mui/material';
import { useNavigate } from 'react-router-dom'; 
import { jsPDF } from 'jspdf'; // Import jsPDF for PDF export
import * as XLSX from 'xlsx'; // Import xlsx for Excel export

const AdminDashboardPage = () => {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [projects, setProjects] = useState([
    { id: 1, name: "Cosmetics Idea", status: "Pending", description: "Project related to Cosmetics", team: ["John Doe", "Jane Doe"], documents: null, department: "CDE" },
    { id: 2, name: "E-Learning Plateform", status: "Pending", description: "Mixing Learning with Internet", team: ["Alice", "Bob"], documents: "link_to_document", department: "BI" },
  ]);

  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [status, setStatus] = useState('');

  const handleOpenModal = (project) => {
    setSelectedProject(project);
    setOpenModal(true);
    setStatus(project.status === 'Pending' ? 'Pending' : project.status); // Ensure status is 'Pending' when no changes are made
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleDepartmentChange = (event) => {
    setSelectedDepartment(event.target.value);
  };

  const handleStatusChange = (newStatus) => {
    if (selectedProject) {
      const updatedProjects = projects.map((project) =>
        project.id === selectedProject.id ? { ...project, status: newStatus } : project
      );
      setProjects(updatedProjects);
    }
  };

  const handleApproveProject = () => {
    if (selectedDepartment) {
      const updatedProjects = projects.map((project) =>
        project.id === selectedProject.id ? { ...project, status: `Approved for ${selectedDepartment}`, department: selectedDepartment } : project
      );
      setProjects(updatedProjects);
      alert(`Project approved for ${selectedDepartment} department.`);
      handleCloseModal();
    } else {
      alert("Please select a department.");
    }
  };

  const handleSubmitProject = () => {
    if (selectedDepartment) {
      const updatedProjects = projects.map((project) =>
        project.id === selectedProject.id ? { ...project, status: `Submitted and sent to ${selectedDepartment}`, department: selectedDepartment } : project
      );
      setProjects(updatedProjects);
      alert(`Project submitted and sent to ${selectedDepartment} department.`);
      handleCloseModal();
    } else {
      alert("Please select a department.");
    }
  };

  const handleRejectProject = () => {
    handleStatusChange('Rejected');
    handleCloseModal();
  };

  const handleExportPDF = () => {
    const doc = new jsPDF();

    let y = 20;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    doc.text("Project List", 14, y);
    y += 10;

    projects.forEach(project => {
      doc.text(`Project: ${project.name}`, 14, y);
      doc.text(`Status: ${project.status}`, 14, y + 6);
      doc.text(`Department: ${project.department || 'Not Assigned'}`, 14, y + 12);
      doc.text(`Description: ${project.description}`, 14, y + 18);
      doc.text(`Members: ${project.team.join(', ')}`, 14, y + 24);
      y += 30;
    });

    doc.save('projects-list.pdf');
  };

  const handleExportExcel = () => {
    const ws = XLSX.utils.json_to_sheet(projects);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Projects");

    XLSX.writeFile(wb, "projects-list.xlsx");
  };

  const handleSubmitAllProjects = () => {
    const allProjectsApprovedOrRejected = projects.every(project => (project.status.toLowerCase().includes('approved'))
      || project.status === 'Rejected');
    
    if (allProjectsApprovedOrRejected) {
      const updatedProjects = projects.map(project => ({ ...project, status: `Submitted and sent to ${selectedDepartment}` }));
      setProjects(updatedProjects);
      alert("All projects have been submitted.");
    } else {
      alert("Please approve or reject all projects before submitting.");
    }
  };

  const getStatusColor = (status) => {
    if (status === 'Rejected') return 'red';
    if (status === 'Approved') return 'green';
    if (status.toLowerCase().includes('submitted')) return 'white';
    return 'orange'; 
  };

  return (
    <div>
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 4 }}>
          Admin Dashboard
        </Typography>

        {projects.map((project) => (
          <div className="project-card" key={project.id} style={{ padding: '20px', marginBottom: '10px', border: '1px solid #ccc', borderRadius: '8px' }}>
            <div className="project-card-header" style={{ display: 'flex', justifyContent: 'space-between' }}>
              <h3>{project.name}</h3>
              <span className={`status ${project.status.toLowerCase()}`} style={{ fontWeight: 'bold', color: getStatusColor(project.status) }}>
                {project.status}
              </span>
            </div>
            <p>{project.description}</p>
            <div className="project-actions">
              <Button onClick={() => handleOpenModal(project)} variant="outlined" color="primary">
                View Details
              </Button>
            </div>
          </div>
        ))}

        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'space-between' }}>
          <Button variant="contained" color="primary" onClick={handleExportPDF}>
            Export as PDF
          </Button>
          <Button variant="contained" color="secondary" onClick={handleExportExcel}>
            Export as Excel
          </Button>
        </Box>

        <Box sx={{ mt: 3 }}>
          <Button variant="contained" color="success" onClick={handleSubmitAllProjects}>
            Submit All Projects
          </Button>
        </Box>

        <Modal open={openModal} onClose={handleCloseModal} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Box sx={{ backgroundColor: 'white', padding: 4, borderRadius: 2, maxWidth: 600, width: '100%' }}>
            <Typography variant="h6" sx={{ marginBottom: 2 }}>
              Project Details: {selectedProject?.name}
            </Typography>

            <Typography variant="body1"><strong>Description:</strong> {selectedProject?.description}</Typography>
            <Typography variant="body1"><strong>Team:</strong> {selectedProject?.team.join(', ')}</Typography>
            <Typography variant="body1"><strong>Documents:</strong> {selectedProject?.documents ? <a href={selectedProject?.documents} target="_blank" rel="noopener noreferrer">View Document</a> : 'None'}</Typography>

            <FormControl fullWidth sx={{ mt: 2 }}>
              <InputLabel id="department-label">Choose Department</InputLabel>
              <Select
                labelId="department-label"
                value={selectedDepartment}
                label="Choose Department"
                onChange={handleDepartmentChange}
              >
                <MenuItem value="Incubator1">Software Engineering</MenuItem>
                <MenuItem value="Incubator2">Marketing</MenuItem>
                <MenuItem value="Incubator3">Research</MenuItem>
              </Select>
            </FormControl>

            <Box sx={{ mt: 3 }}>
              <Button variant="contained" color="primary" onClick={handleApproveProject} sx={{ mr: 2 }}>
                Approve
              </Button>
              <Button variant="contained" color="secondary" onClick={handleRejectProject}>
                Reject
              </Button>
            </Box>

            <Button variant="outlined" color="primary" onClick={handleCloseModal} sx={{ mt: 2 }}>
              Close
            </Button>
          </Box>
        </Modal>
      </Container>
    </div>
  );
};

export default AdminDashboardPage;
