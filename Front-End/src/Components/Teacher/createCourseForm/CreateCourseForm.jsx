import React, { useState } from 'react';
import axios from 'axios';
import useAuthStore from '../../../store/authStore';
import './createForm.css';

const CreateCourseForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [lessons, setLessons] = useState([{ title: '', content: '' }]);
  const [assignments, setAssignments] = useState([{ title: '', description: '' }]);
  const [quizzes, setQuizzes] = useState([{ question: '', choices: ['A', 'B', 'C', 'D'], answer: '' }]);
  const { user } = useAuthStore((state) => state);

  const handleAddField = (setter, fields) => {
    setter([...fields, { title: '', content: '' }]);
  };

  const handleChangeField = (setter, fields, index, field, value) => {
    const newFields = fields.map((f, i) => (i === index ? { ...f, [field]: value } : f));
    setter(newFields);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user || !user.id) {
      alert('No user information available');
      return;
    }

    try {
      await axios.post('http://localhost:5000/api/teacher/create', {
        title,
        description,
        imageUrl,
        lessons,
        assignments,
        quizzes,
        teacherId: user.id,
      });
      alert('Course created successfully');
      setTitle('');
      setDescription('');
      setImageUrl('');
      setLessons([{ title: '', content: '' }]);
      setAssignments([{ title: '', description: '' }]);
      setQuizzes([{ question: '', choices: ['A', 'B', 'C', 'D'], answer: '' }]);
    } catch (error) {
      console.error('Error creating course:', error);
      alert('Failed to create course');
    }
  };

  return (
    <div className="create-course-container">
      <form onSubmit={handleSubmit} className="create-course-form">
        <h2>Create a Course</h2>
        <label>
          Title:
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </label>
        <label>
          Description:
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
        </label>
        <label>
          Image URL:
          <input type="text" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
        </label>

        <h3>Lessons</h3>
        {lessons.map((lesson, index) => (
          <div key={index}>
            <label>
              Lesson Title:
              <input
                type="text"
                value={lesson.title}
                onChange={(e) => handleChangeField(setLessons, lessons, index, 'title', e.target.value)}
              />
            </label>
            <label>
              Lesson Content:
              <textarea
                value={lesson.content}
                onChange={(e) => handleChangeField(setLessons, lessons, index, 'content', e.target.value)}
              />
            </label>
          </div>
        ))}
        <button type="button" onClick={() => handleAddField(setLessons, lessons)}>Add Lesson</button>

        <h3>Assignments</h3>
        {assignments.map((assignment, index) => (
          <div key={index}>
            <label>
              Assignment Title:
              <input
                type="text"
                value={assignment.title}
                onChange={(e) => handleChangeField(setAssignments, assignments, index, 'title', e.target.value)}
              />
            </label>
            <label>
              Assignment Description:
              <textarea
                value={assignment.description}
                onChange={(e) => handleChangeField(setAssignments, assignments, index, 'description', e.target.value)}
              />
            </label>
          </div>
        ))}
        <button type="button" onClick={() => handleAddField(setAssignments, assignments)}>Add Assignment</button>

        <h3>Quizzes</h3>
        {quizzes.map((quiz, index) => (
          <div key={index}>
            <label>
              Question:
              <input
                type="text"
                value={quiz.question}
                onChange={(e) => handleChangeField(setQuizzes, quizzes, index, 'question', e.target.value)}
              />
            </label>
            <label>
              Choices:
              {quiz.choices.map((choice, i) => (
                <input
                  key={i}
                  type="text"
                  value={choice}
                  onChange={(e) => {
                    const newChoices = quiz.choices.map((c, j) => (j === i ? e.target.value : c));
                    handleChangeField(setQuizzes, quizzes, index, 'choices', newChoices);
                  }}
                />
              ))}
            </label>
            <label>
              Answer:
              <input
                type="text"
                value={quiz.answer}
                onChange={(e) => handleChangeField(setQuizzes, quizzes, index, 'answer', e.target.value)}
              />
            </label>
          </div>
        ))}
        <button type="button" onClick={() => handleAddField(setQuizzes, quizzes)}>Add Quiz</button>

        <button type="submit">Create Course</button>
      </form>
    </div>
  );
};

export default CreateCourseForm;
