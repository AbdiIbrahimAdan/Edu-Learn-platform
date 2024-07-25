import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CourseList.css';

const Modal = ({ isOpen, onClose, children }) => (
  isOpen ? (
    <div className="modal-overlay">
      <div className="modal-content">
        {children}
        <button className="modal-close-btn" onClick={onClose}>Close</button>
      </div>
    </div>
  ) : null
);

const CourseForm = ({ formData, onChange, onSubmit }) => (
  <form className="course-form" onSubmit={onSubmit}>
    <input
      type="text"
      placeholder="Title"
      value={formData.title}
      onChange={(e) => onChange('title', e.target.value)}
    />
    <textarea
      placeholder="Description"
      value={formData.description}
      onChange={(e) => onChange('description', e.target.value)}
    />
    <input
      type="text"
      placeholder="Image URL"
      value={formData.imageUrl}
      onChange={(e) => onChange('imageUrl', e.target.value)}
    />
    <button type="submit">Submit</button>
  </form>
);

const CourseList = () => {
  const [courses, setCourses] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    imageUrl: '',
    modules: [],
    lessons: [],
    assignments: [],
    quizzes: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:5000/api/teacher/courses');
        setCourses(response.data);
      } catch (error) {
        setError('Error fetching courses.');
        console.error('Error fetching courses:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleAddCourse = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/teacher/courses', formData);
      setCourses([...courses, response.data]);
      setIsAddModalOpen(false);
      resetFormData();
    } catch (error) {
      console.error('Error adding course:', error);
    }
  };

  const handleUpdateCourse = async () => {
    try {
      const response = await axios.put(`http://localhost:5000/api/teacher/courses/${selectedCourse.id}`, formData);
      setCourses(courses.map((course) => course.id === selectedCourse.id ? response.data : course));
      setIsUpdateModalOpen(false);
      resetFormData();
      setSelectedCourse(null);
    } catch (error) {
      console.error('Error updating course:', error);
    }
  };

  const resetFormData = () => {
    setFormData({
      title: '',
      description: '',
      imageUrl: '',
      modules: [],
      lessons: [],
      assignments: [],
      quizzes: [],
    });
  };

  return (
    <div className="course-list-container">
      <h2>Course List</h2>
      <button className="course-add-btn" onClick={() => setIsAddModalOpen(true)}>Add Course</button>

      {loading && <p>Loading courses...</p>}
      {error && <p>{error}</p>}

      <div className="course-grid">
        {courses.map((course) => (
          <div key={course.id} className="course-card">
            <img src={course.imageUrl} alt={course.title} className="course-image" />
            <div className="course-content">
              <h3 className="course-title">{course.title}</h3>
              <p className="course-description">{course.description}</p>

              <div className="course-details">
                <h4>Modules</h4>
                {(course.modules || []).map((module, index) => (
                  <div key={index}>
                    <p><strong>{module.title}</strong>: {module.content}</p>
                  </div>
                ))}
                <h4>Lessons</h4>
                {(course.lessons || []).map((lesson, index) => (
                  <div key={index}>
                    <p><strong>{lesson.title}</strong>: {lesson.content}</p>
                  </div>
                ))}
                <h4>Assignments</h4>
                {(course.assignments || []).map((assignment, index) => (
                  <div key={index}>
                    <p><strong>{assignment.title}</strong>: {assignment.description}</p>
                  </div>
                ))}
                <h4>Quizzes</h4>
                {(course.quizzes || []).map((quiz, index) => (
                  <div key={index}>
                    <p><strong>{quiz.question}</strong></p>
                    <p>Choices: {quiz.choices.join(', ')}</p>
                    <p>Answer: {quiz.answer}</p>
                  </div>
                ))}
              </div>

              <button
                className="course-update-btn"
                onClick={() => {
                  setSelectedCourse(course);
                  setFormData({
                    title: course.title || '',
                    description: course.description || '',
                    imageUrl: course.imageUrl || '',
                    modules: course.modules || [],
                    lessons: course.lessons || [],
                    assignments: course.assignments || [],
                    quizzes: course.quizzes || [],
                  });
                  setIsUpdateModalOpen(true);
                }}
              >
                Update
              </button>
            </div>
          </div>
        ))}
      </div>

      <Modal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)}>
        <h2>Add Course</h2>
        <CourseForm formData={formData} onChange={handleInputChange} onSubmit={handleAddCourse} />
      </Modal>

      <Modal isOpen={isUpdateModalOpen} onClose={() => setIsUpdateModalOpen(false)}>
        <h2>Update Course</h2>
        <CourseForm formData={formData} onChange={handleInputChange} onSubmit={handleUpdateCourse} />
      </Modal>
    </div>
  );
};

export default CourseList;
