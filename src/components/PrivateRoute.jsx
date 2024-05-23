// components/PrivateRoute.js
import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../components/AuthContext';

export const PrivateRoute = () => {
  const { auth } = useContext(AuthContext);

  return auth.isAuthenticated ? <Outlet /> : <Navigate to="/" />;
};
