import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import useAuthStore from '../store/authStore';

const AdminRoute = () => {
  const { user, isAuthenticated } = useAuthStore();

  if (!isAuthenticated || user.role !== 'ADMIN') {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default AdminRoute;
