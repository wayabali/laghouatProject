import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ProjectStatusPage.css';

const ProjectStatusPage = () => {
  const navigate = useNavigate();


  //TEST WITH STATIC DATA

  const [project] = useState({
    name: 'Smart Campus App',
    status: 'Pending',
    description: 'A mobile application to help students navigate campus facilities.',
    submissionDate: '2025-03-15',
    members: [
      {
        fullName: 'Ahmed Student',
        email: 'ahmed@example.com',
        studentCardId: '12345',
        domain: 'Software Engineering',
      },
      {
        fullName: 'Amina Benali',
        email: 'amina@example.com',
        studentCardId: '67890',
        domain: 'Computer Science',
      },
      {
        fullName: 'John Doe',
        email: 'john@example.com',
        studentCardId: '54321',
        domain: 'Electrical Engineering',
      },
      {
        fullName: 'Jane Smith',
        email: 'jane@example.com',
        studentCardId: '98765',
        domain: 'Mechanical Engineering',
      },
      {
        fullName: 'Ali Ahmed',
        email: 'ali@example.com',
        studentCardId: '11223',
        domain: 'Civil Engineering',
      },
      {
        fullName: 'Sarah Johnson',
        email: 'sarah@example.com',
        studentCardId: '44556',
        domain: 'Chemical Engineering',
      }
    ]
  });

  const calculateTimeSinceSubmission = () => {
    const submissionDate = new Date(project.submissionDate);
    const currentDate = new Date();
    const timeDifference = currentDate - submissionDate;
    const daysSinceSubmission = Math.floor(timeDifference / (1000 * 3600 * 24)); 
    return daysSinceSubmission;
  };

  const timeSinceSubmission = calculateTimeSinceSubmission();

  const [currentPage, setCurrentPage] = useState(1);
  const membersPerPage = 2;

  const indexOfLastMember = currentPage * membersPerPage;
  const indexOfFirstMember = indexOfLastMember - membersPerPage;
  const currentMembers = project.members.slice(indexOfFirstMember, indexOfLastMember);

  const totalPages = Math.ceil(project.members.length / membersPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleDisconnect = () => {
    navigate('/'); 
  };

  return (
    <div className="project-status-container">
      <div className="project-status-box">
        <h2>Project Status - {project.name}</h2>
        
        <div className="status-section">
          <div className="status-info">
            <strong>Status:</strong> {project.status}
          </div>
          <div className="submission-time">
            <strong>Time since submission:</strong> {timeSinceSubmission} days ago
          </div>
        </div>
        
        <div className="project-details">
          <h3>Project Details</h3>
          <p><strong>Description:</strong> {project.description}</p>
          
          <h3>Team Members</h3>
          <div className="members-list">
            {currentMembers.map((member, index) => (
              <div key={index} className="member-details">
                <p><strong>Full Name:</strong> {member.fullName}</p>
                <p><strong>Email:</strong> {member.email}</p>
                <p><strong>Student Card ID:</strong> {member.studentCardId}</p>
                <p><strong>Domain:</strong> {member.domain}</p>
                {index !== currentMembers.length - 1 && <hr />} {/* Line separator */}
              </div>
            ))}
          </div>

          <div className="pagination">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                className={`page-btn ${currentPage === index + 1 ? 'active' : ''}`}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>

        <button className="disconnect-btn" onClick={handleDisconnect}>Disconnect</button>
      </div>
    </div>
  );
};

export default ProjectStatusPage;
