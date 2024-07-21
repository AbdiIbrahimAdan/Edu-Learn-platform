import React from 'react'
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import useAuthStore from '../../store/authStore';
import {useNavigate} from 'react-router-dom';
import './Signup.css';

const Signup = () => {

    
const SignupSchema = Yup.object().shape({
    firstName: Yup.string().required('First Name is required'),
    lastName: Yup.string().required('Last Name is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
    phoneNumber: Yup.string().required('Phone Number  is required').min(8, 'Phone Number must be at least 8 digit'),
    password: Yup.string().required('Password is required').min(6, 'Password must be at least 6 characters'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm Password is required'),
  });

    
     const setUser = useAuthStore((state) => state.setUser);
     const navigate = useNavigate();

     const handleSignup = async (values, {
        setSubmitting }) => {
            try {
                const response = await axios.post('/api/auth/signup', values, {
                    withCredentials: true
                });
                setUser(response.data.user);
              navigate('/login');
            } catch (error){
              console.error('Signup failed:', error);
              setSubmitting(false);
            }
        }
    
      
    
      return (
        <div className="signup-container">
          <h2>Sign up</h2>
          <Formik initialValues={{firstName: '', lastName:'', email:'', phoneNumber:'', password:'', confirmPassword: ''}} 
          SignupSchema={SignupSchema} 
          onSubmit={handleSignup}>

            {({isSubmitting}) => (
            <Form>
              <div className="form-group">
                <label htmlFor="firstName">First Name:</label>
                <Field type="text" id="firstName" name="firstName" />
                <ErrorMessage name="firstName" component="div" className="error" />
              </div>
    
              <div className="form-group">
                <label htmlFor="lastName">Last Name:</label>
                <Field type="text" id="lastName" name="lastName" />
                <ErrorMessage name="lastName" component="div" className="error" />
              </div>
    
              <div className="form-group">
                <label htmlFor="email">Email:</label>
                <Field type="email" id="email" name="email" />
                <ErrorMessage name="email" component="div" className="error" />
              </div>

              <div className="form-group">
                <label htmlFor="phoneNumber">Phone Number:</label>
                <Field type="number" id="phoneNumber" name="phoneNumber" />
                <ErrorMessage name="phoneNumber" component="div" className="error" />
              </div>
    
              <div className="form-group">
                <label htmlFor="password">Password:</label>
                <Field type="password" id="password" name="password" />
                <ErrorMessage name="password" component="div" className="error" />
              </div>
    
              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm Password:</label>
                <Field type="password" id="confirmPassword" name="confirmPassword" />
                <ErrorMessage name="confirmPassword" component="div" className="error" />
              </div>
    
              <button type="submit">Create Account</button>
            </Form>
            )}
          </Formik>
        </div>
      );
    };
    


export default Signup;
