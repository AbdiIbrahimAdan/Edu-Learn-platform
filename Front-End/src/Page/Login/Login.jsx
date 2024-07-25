import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import useAuthStore from '../../store/authStore';
import { useNavigate, Link } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const setUser = useAuthStore((state) => state.setUser);
  const navigate = useNavigate();

  const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

  const handleLogin = async (values, { setSubmitting }) => {
    try {
      const response = await axios.post('http://localhost:5000/api/user/login', values, {
        withCredentials: true,
        headers: { 'Content-Type': 'application/json' },
      });

      const user = response.data.user;
      setUser(user);

      switch (user.role) {
        case 'ADMIN':
          navigate('/admin/dashboard');
          break;
        case 'TEACHER':
          navigate('/teacher/dashboard');
          break;
        case 'STUDENT':
          navigate('/student/dashboard');
          break;
        default:
          navigate('/');
          break;
      }
      alert('Login Successfully');
    } catch (error) {
      console.error('Login failed:', error);
      alert('Login failed, please try again later...');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <Formik
        initialValues={{ email: '', password: '' }}
        validationSchema={LoginSchema}
        onSubmit={handleLogin}
      >
        {({ isSubmitting }) => (
          <Form>
            <div className="form-container">
              <label htmlFor="email">Email:</label>
              <Field type="email" id="email" name="email" />
              <ErrorMessage name="email" component="div" className="error" />
            </div>

            <div className="form-container">
              <label htmlFor="password">Password:</label>
              <Field type="password" id="password" name="password" />
              <ErrorMessage name="password" component="div" className="error" />
            </div>

            <button type="submit" disabled={isSubmitting}>Login</button>
          </Form>
        )}
      </Formik>

      <p>Don't have an account? <Link to="/signup">Sign up</Link></p>
    </div>
  );
};

export default Login;
