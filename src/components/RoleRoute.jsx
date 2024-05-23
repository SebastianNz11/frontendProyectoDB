// components/RoleRoute.js
import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../components/AuthContext';

export const RoleRoute = ({ roles }) => {
  const { auth } = useContext(AuthContext);

  return auth.isAuthenticated && roles.includes(auth.role) ? <Outlet /> : <Navigate to="/" />;
};
