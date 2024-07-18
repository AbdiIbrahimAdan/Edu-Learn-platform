import React from 'react'
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import useAuthStore from '../../store/authStore';
import {useHistory} from 'react-router-dom';

const LoginSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });

const Login = () => {
    
     const setUser = useAuthStore((state) => state.setUser);
     const history = useHistory();

     const handleLogin = async (values, {
        setSubmitting }) => {
            try {
                const response = await axios.post('/api/auth/login', values, {
                    withCredentials: true
                });
                setUser(response.data.user);
                history.push('/dashboard');
            } catch (error){
              console.error('Login failed:', error);
              setSubmitting(false);
            }
        }
    
      
    
      return (
        <div className="login-container">
          <h2>Login</h2>
          <Formik initialValues={{email:'', password:''}} 
          SignupSchema={LoginSchema} 
          onSubmit={handleLogin}>

            {({isSubmitting}) => (
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
    
              <button type="submit">Create Account</button>
            </Form>
            )}
          </Formik>
        </div>
      );
    };
    
    export default Login;