import React, { useState, useEffect } from 'react';
import { Button, Typography, Container, Box, Modal, MenuItem, Select, FormControl, InputLabel, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom'; 
import { jsPDF } from 'jspdf'; 
import * as XLSX from 'xlsx'; 
import './AdminDashboardPage.css';
import ResponsiveAppBar from '../Components/navigationBar'; 
import { FaRegFilePdf, FaArrowUpRightFromSquare } from "react-icons/fa6";
import { RiFileExcel2Line } from "react-icons/ri";

const AdminDashboardPage = () => {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [projects, setProjects] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState('');

  // Fetch projects when component mounts
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch("https://project-management-app-bvjs.onrender.com/accounts/admin/projects/");
        const data = await response.json();
        setProjects(data);
      } catch (error) {
        console.error("Error fetching projects:", error);
        alert("Failed to fetch projects");
      }
    };

    fetchProjects();
  }, []);

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

  const handleReviewProject = async (action) => {
    if (selectedProject) {
      try {
        const response = await fetch(`https://project-management-app-bvjs.onrender.com/accounts/admin/projects/${selectedProject.id}/review_project/`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ action }),
        });

        const data = await response.json();
        if (response.ok) {
          // Update project state based on the action taken
          const updatedProjects = projects.map((project) =>
            project.id === selectedProject.id ? { ...project, state: action } : project
          );
          setProjects(updatedProjects);
          alert(`Project ${action === "accept" ? "accepted" : action === "reject" ? "rejected" : action}`);
        } else {
          alert(data.detail || "Failed to change project state.");
        }
      } catch (error) {
        console.error("Error during project review:", error);
        alert("An error occurred while reviewing the project.");
      }

      handleCloseModal();
    } else {
      alert("No project selected.");
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
      doc.text(`Status: ${project.state}`, 14, y + 6);
      doc.text(`Department: ${project.department || 'Not Assigned'}`, 14, y + 12);
      doc.text(`Description: ${project.description}`, 14, y + 18);
      doc.text(`Members: ${project.members.map(member => member.first_name).join(', ')}`, 14, y + 24);
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

  const getStatusColor = (status) => {
    if (status === 'accepted') return 'green';
    if (status === 'Rejected') return 'red';
    if (status === 'under_review') return 'orange';
    return 'black';
  };

  return (
    <div>
      <ResponsiveAppBar  />
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
                  <TableCell style={{ color: getStatusColor(project.state), fontWeight: 'bold' }}>
                    {project.state}
                  </TableCell>
                  <TableCell>{new Date(project.created_at).toLocaleDateString()}</TableCell>
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
            <Typography variant="body1"><strong>Team:</strong> {selectedProject?.members.map(member => member.first_name).join(', ')}</Typography>

            <Box sx={{ mt: 2 }}>
              <Button variant="contained" color="primary" onClick={() => handleReviewProject('accept')} sx={{ mr: 2 }}>
                Accept
              </Button>
              <Button variant="contained" color="secondary" onClick={() => handleReviewProject('reject')}>
                Reject
              </Button>
              <Button variant="contained" color="default" onClick={() => handleReviewProject('cti')} sx={{ mr: 2 }}>
                CTI
              </Button>
              <Button variant="contained" color="default" onClick={() => handleReviewProject('cde')}>
                CDE
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
