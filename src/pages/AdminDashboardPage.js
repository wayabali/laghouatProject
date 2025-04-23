import React, { useState } from 'react';
import { Button, Typography, Container, Box, Modal, MenuItem, Select, FormControl, InputLabel, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom'; 
import { jsPDF } from 'jspdf'; 
import * as XLSX from 'xlsx'; 
import './AdminDashboardPage.css'
import ResponsiveAppBar from '../Components/navigationBar'; // Assuming you have a TopBar component
import { FaRegFilePdf , FaArrowUpRightFromSquare  } from "react-icons/fa6";
import { RiFileExcel2Line } from "react-icons/ri";



const AdminDashboardPage = () => {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [projects, setProjects] = useState([
    { id: 1, name: "Cosmetics Idea", status: "Pending", description: "Project related to Cosmetics", team: ["John Doe", "Jane Doe"], documents: null, department: "CDE", dateSubmitted: "2025-04-10" },
    { id: 2, name: "E-Learning Plateform", status: "Pending", description: "Mixing Learning with Internet", team: ["Alice", "Bob"], documents: "link_to_document", department: "BI", dateSubmitted: "2025-04-12" },
    { id: 3, name: "Tech Startup", status: "Approved", description: "A new tech startup project", team: ["Emma", "Zoe"], documents: null, department: "CDE", dateSubmitted: "2025-04-14" },
  ]);

  const [selectedDepartment, setSelectedDepartment] = useState('');

  const handleOpenModal = (project) => {
    setSelectedProject(project);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleDepartmentChange = (event) => {
    setSelectedDepartment(event.target.value);
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

  

  const handleRejectProject = () => {
    if (selectedProject) {
      const updatedProjects = projects.map((project) =>
        project.id === selectedProject.id ? { ...project, status: "Rejected" } : project
      );
      setProjects(updatedProjects);
      alert(`Project "${selectedProject.name}" has been rejected.`);
      handleCloseModal();
    } else {
      alert("No project selected to reject.");
    }
  };

  // Function to get status color based on project status
  const getStatusColor = (status) => {
    if (status === 'Approved') return 'green';
    if (status === 'Rejected') return 'red';
    if (status === 'Pending') return 'orange';
    return 'black'; // Default color if no status matches
  };

  return (

<div>
  <ResponsiveAppBar  /> {/* Assuming you have a TopBar component */}
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 'bold', mb: 4 }}>
          Admin Dashboard
        </Typography>

        {/* Table to display projects */}
        <TableContainer component={Paper} sx={{ mb: 3 }}>
          <Table>
            <TableHead >
              <TableRow >
                <TableCell style={{fontWeight: 'bold'}} >ID</TableCell>
                <TableCell style={{fontWeight: 'bold'}}>Name</TableCell>
                <TableCell style={{fontWeight: 'bold'}}>Status</TableCell>
                <TableCell style={{fontWeight: 'bold'}}>Date of Submission</TableCell>
                <TableCell style={{fontWeight: 'bold'}}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {projects.map((project) => (
                <TableRow key={project.id}>
                  <TableCell>{project.id}</TableCell>
                  <TableCell>{project.name}</TableCell>
                  {/* Displaying status with color based on status */}
                  <TableCell style={{ color: getStatusColor(project.status), fontWeight: 'bold' }}>
                    {project.status}
                  </TableCell>
                  <TableCell>{project.dateSubmitted}</TableCell>
                  <TableCell>
                    <Button onClick={() => handleOpenModal(project)} variant="outlined" color="black">
                    <FaArrowUpRightFromSquare style={{ fontSize: '1rem' }} />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'right' , gap: 2 }}>
          <Button sx={{ backgroundColor: 'red', color: 'white' }} variant="contained" onClick={handleExportPDF}>
          <FaRegFilePdf style={{ fontSize: '1.2rem' }} />
          </Button>
          <Button sx={{ backgroundColor: 'green', color: 'white', width: 'auto' }} variant="contained" onClick={handleExportExcel}>
          <RiFileExcel2Line style={{ fontSize: '1.2rem' }} />
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
                <MenuItem value="Incubator1">Incubator1</MenuItem>
                <MenuItem value="Incubator2">Incubator2</MenuItem>
                <MenuItem value="Incubator3">Incubator3</MenuItem>
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
