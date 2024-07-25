import React from 'react';
import useStudentStore from '../../store/useStudentStore';
import './CourseList.css';
const EnrollButton = ({ courseId }) => {
  const { enrollInCourse } = useStudentStore((state) => ({
    enrollInCourse: state.enrollInCourse,
  }));

  const handleEnroll = async () => {
    await enrollInCourse(courseId);
  };

  return (
    <button onClick={handleEnroll} className="enroll-button">
      Enroll
    </button>
  );
};

export default EnrollButton;
