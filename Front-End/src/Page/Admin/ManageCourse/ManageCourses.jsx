import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CourseList = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.delete('http://localhost:5000/api/teacher/courses/${id}');
        setCourses(response.data);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchCourses();
  }, []);

  return (
    <div className="course-list">
      <h2>Courses</h2>
      <div className="course-grid">
        {courses.map(course => (
          <div key={course.id} className="course-item">
            <img src={course.imageUrl} alt={course.title} className="course-image" />
            <h3 className="course-title">{course.title}</h3>
            <p className="course-description">{course.description}</p>
          
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseList;
