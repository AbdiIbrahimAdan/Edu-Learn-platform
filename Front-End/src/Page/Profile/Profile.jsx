import React, { useEffect } from 'react';
// import useAuthStore from '../../store/authStore';
import useStudentStore from '../../store/useStudentStore';

const Profile = () => {
  const { student, fetchStudent } = useStudentStore((state) => ({
    student: state.student,
    fetchStudent: state.fetchStudent,
  }));

  useEffect(() => {
    fetchStudent();
  }, [fetchStudent]);

  return (
    <div>
      <h1>Student Profile</h1>
      {student ? (
        <div>
          <p>Name: {student.firstName} {student.lastName}</p>
          <p>Email: {student.email}</p>
         
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Profile;
