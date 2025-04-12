import React, { useState } from "react";
import {
  Button,
  Typography,
  Container,
  Box,
  TextField,
  Modal,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import "./ProjectHomePage.css"; 

const ProjectHomepage = () => {
  const navigate = useNavigate();
  const [projectName, setProjectName] = useState("Smart Campus App");
  const [projectDescription, setProjectDescription] = useState(
    "A mobile application to help students navigate campus facilities"
  );
  const [teamMembers, setTeamMembers] = useState([
    {
      fullName: "Ahmed Student",
      email: "ahmed@example.com",
      studentCardId: "12345",
      birthDate: "2000-01-01",
      phone: "0123456789",
      domain: "Software Engineering",
      isEditable: false, 
    },
  ]); 
  const [newMember, setNewMember] = useState({
    fullName: "",
    email: "",
    studentCardId: "",
    birthDate: "",
    phone: "",
    domain: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [openPopup, setOpenPopup] = useState(false);
  const [editMemberIndex, setEditMemberIndex] = useState(null); 

  const handleOpenPopup = (index = null) => {
    setEditMemberIndex(index);
    if (index !== null) {
      const memberToEdit = teamMembers[index];
      setNewMember({ ...memberToEdit });
    } else {
      setNewMember({
        fullName: "",
        email: "",
        studentCardId: "",
        birthDate: "",
        phone: "",
        domain: "",
        isEditable: true,
      });
    }
    setOpenPopup(true);
  };

  const handleClosePopup = () => {
    setOpenPopup(false);
    setNewMember({
      fullName: "",
      email: "",
      studentCardId: "",
      birthDate: "",
      phone: "",
      domain: "",
    });
  };

  const handleAddMember = () => {
    if (teamMembers.length < 6) {
      setTeamMembers([...teamMembers, { ...newMember, isEditable: true }]);
      handleClosePopup(); 
    } else {
      alert("You can only add up to 5 members.");
    }
  };

  const handleSaveMember = () => {
    const updatedMembers = [...teamMembers];
    if (editMemberIndex !== null) {
      updatedMembers[editMemberIndex] = newMember; 
    } else {
      updatedMembers.push(newMember); 
    }
    setTeamMembers(updatedMembers);
    handleClosePopup(); 
  };

  const handleDeleteMember = (index) => {
    if (index !== 0) {
      const updatedMembers = teamMembers.filter((_, i) => i !== index);
      setTeamMembers(updatedMembers);
    } else {
      alert("You can't delete the project leader.");
    }
  };

  const handleSaveProject = () => {
    console.log("Project saved:", projectName, projectDescription, teamMembers);
    alert("Project information saved!");
  };

  const handleSubmitProject = () => {
    if (isSubmitted) {
      alert("The project has already been submitted.");
    } else {
      setIsSubmitted(true);
      console.log(
        "Project submitted:",
        projectName,
        projectDescription,
        teamMembers
      );
      navigate("/project-status"); 
    }
  };

  return (
    <div className="project-homepage-container">
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Box
          sx={{
            backgroundColor: "#f5f5f5",
            padding: 4,
            borderRadius: 2,
            boxShadow: 2,
          }}
        >
          <Typography variant="h5" sx={{ fontWeight: "bold", mb: 2 }}>
            Project Dashboard - {projectName}
          </Typography>

          <TextField
            fullWidth
            label="Project Name"
            variant="outlined"
            margin="normal"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            disabled={isSubmitted} 
          />

          <TextField
            fullWidth
            label="Project Description"
            variant="outlined"
            multiline
            rows={4}
            margin="normal"
            value={projectDescription}
            onChange={(e) => setProjectDescription(e.target.value)}
            disabled={isSubmitted} 
          />

          <Typography variant="h6" sx={{ mt: 3, mb: 1 }}>
            Team Members ({teamMembers.length}/6)
          </Typography>
          <Box sx={{ mb: 2 }}>
            {teamMembers.map((member, index) => (
              <Box
                key={index}
                sx={{ mb: 2, display: "flex", alignItems: "center" }}
              >
                <Typography sx={{ mr: 2 }}>
                  {member.fullName} ({member.domain})
                </Typography>
                {!isSubmitted &&
                  index !== 0 && ( 
                    <Button
                      variant="outlined"
                      color="secondary"
                      onClick={() => handleDeleteMember(index)}
                    >
                      Delete
                    </Button>
                  )}
                {!isSubmitted &&
                  member.isEditable &&
                  index !== 0 && ( 
                    <Button
                      variant="outlined"
                      color="primary"
                      onClick={() => handleOpenPopup(index)} 
                    >
                      Edit
                    </Button>
                  )}
              </Box>
            ))}
          </Box>

          {!isSubmitted && teamMembers.length < 6 && (
            <Button
              variant="contained"
              sx={{
                backgroundColor: "#4CAF50", 
                color: "white", 
                "&:hover": {
                  backgroundColor: "#45a049", 
                },
                mt: 2,
              }}
              onClick={() => handleOpenPopup()}
            >
              Add Member
            </Button>
          )}

          <Button
            fullWidth
            variant="contained"
            sx={{
              backgroundColor: "#4CAF50", 
              color: "white", 
              "&:hover": {
                backgroundColor: "#45a049", 
              },
              mt: 4,
            }}
            onClick={handleSaveProject}
            disabled={isSubmitted}
          >
            Save Project
          </Button>

          <Button
            fullWidth
            variant="contained"
            sx={{
              backgroundColor: "#4CAF50",
              color: "white", 
              "&:hover": {
                backgroundColor: "#45a049", 
              },
              mt: 2,
            }}
            onClick={handleSubmitProject}
            disabled={isSubmitted}
          >
            {isSubmitted ? "Project Submitted" : "Submit Project"}
          </Button>
        </Box>
      </Container>

      <Modal
        open={openPopup}
        onClose={handleClosePopup}
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Box
          sx={{
            backgroundColor: "white",
            padding: 4,
            borderRadius: 2,
            maxWidth: 600,
            width: "100%",
          }}
        >
          <Typography variant="h6" sx={{ marginBottom: 2 }}>
            {editMemberIndex === null ? "Add Team Member" : "Edit Team Member"}
          </Typography>

          <TextField
            fullWidth
            label="Full Name"
            variant="outlined"
            margin="normal"
            value={newMember.fullName}
            onChange={(e) =>
              setNewMember({ ...newMember, fullName: e.target.value })
            }
          />
          <TextField
            fullWidth
            label="Email"
            variant="outlined"
            margin="normal"
            value={newMember.email}
            onChange={(e) =>
              setNewMember({ ...newMember, email: e.target.value })
            }
          />
          <TextField
            fullWidth
            label="Student Card ID"
            variant="outlined"
            margin="normal"
            value={newMember.studentCardId}
            onChange={(e) =>
              setNewMember({ ...newMember, studentCardId: e.target.value })
            }
          />
          <TextField
            fullWidth
            label="Birth Date"
            variant="outlined"
            margin="normal"
            type="date"
            value={newMember.birthDate}
            onChange={(e) =>
              setNewMember({ ...newMember, birthDate: e.target.value })
            }
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextField
            fullWidth
            label="Phone"
            variant="outlined"
            margin="normal"
            value={newMember.phone}
            onChange={(e) =>
              setNewMember({ ...newMember, phone: e.target.value })
            }
          />
          <TextField
            fullWidth
            label="Domain"
            variant="outlined"
            margin="normal"
            value={newMember.domain}
            onChange={(e) =>
              setNewMember({ ...newMember, domain: e.target.value })
            }
          />

          <Box sx={{ mt: 3 }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSaveMember}
              sx={{ backgroundColor: "#4CAF50", // Green background
                color: "white", 
                "&:hover": {
                  backgroundColor: "#45a049", 
                },
                mt: 2,}}
            >
              {editMemberIndex === null ? "Save Member" : "Save Edits"}
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={handleClosePopup}
              sx={{ backgroundColor: "#45a049", // Green background
                color: "white", // Text color is white
                "&:hover": {
                  backgroundColor: "#45a049", // Darker green on hover
                },
                mt: 2,
            ml: 2}}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default ProjectHomepage;
