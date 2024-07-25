import { create } from 'zustand';
import axios from 'axios';

const useStudentStore = create((set, get) => ({
  student: null,
  setStudent: (student) => set({ student }),

  enrollInCourse: async (courseId) => {
    try {
      const { student } = get();
      if (student) {
        await axios.post('http://localhost:5000/api/teacher/enrollments', {
          courseId,
          studentId: student.id 
        });
        alert('Enrollment successful');
      } else {
        alert('No student information available');
      }
    } catch (error) {
      console.error('Error enrolling in course:', error);
    }
  },

  fetchStudent: async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/user/student/me');
      if (response.data) {
        set({ student: response.data });
      }
    } catch (error) {
      console.error('Error fetching student information:', error);
      set({ student: null });
    }
  }
}));

export default useStudentStore;
