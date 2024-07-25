import React, { useState } from 'react';
import CreateCourseForm from '../../Components/Teacher/createCourseForm/CreateCourseForm';
import CreateAssignmentForm from '../../Components/Teacher/Assignment/CreateAssignmentForm';
import CreateQuizForm from '../../Components/Teacher/Quiz/CreateQuizForm';
import CourseList from '../../Components/Teacher/courselist/CourseList'; 
import AssignmentList from '../../Components/Teacher/Assignment/AssignmentList'; 
import QuizList from '../../Components/Teacher/Quiz/QuizList';
import './TeacherDashboard.css'; 

const TeacherDashboard = () => {
  const [activeSection, setActiveSection] = useState('createCourse');

  const renderContent = () => {
    switch (activeSection) {
      case 'createCourse':
        return <CreateCourseForm />;
      case 'createAssignment':
        return <CreateAssignmentForm />;
      case 'createQuiz':
        return <CreateQuizForm />;
      case 'courseList':
        return <CourseList />;
      case 'assignmentList':
        return <AssignmentList />;
      case 'quizList':
        return <QuizList />;
      default:
        return <CreateCourseForm />;
    }
  };

  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <h2>Teacher Dashboard</h2>
        <ul>
          <li onClick={() => setActiveSection('createCourse')}>Create Course</li>
          <li onClick={() => setActiveSection('createAssignment')}>Create Assignment</li>
          <li onClick={() => setActiveSection('createQuiz')}>Create Quiz</li>
          <li onClick={() => setActiveSection('courseList')}>Course List</li>
          <li onClick={() => setActiveSection('assignmentList')}>Assignment List</li>
          <li onClick={() => setActiveSection('quizList')}>Quiz List</li>
        </ul>
      </div>
      <div className="content">
        {renderContent()}
      </div>
    </div>
  );
};

export default TeacherDashboard;
