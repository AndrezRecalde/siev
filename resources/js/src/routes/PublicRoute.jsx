import React from 'react'
import { Navigate } from 'react-router-dom';
import { useAuthStore } from '../hooks/useAuthStore'

export const PublicRoute = ({ children }) => {

   const {status} = useAuthStore();

  return (status !== "authenticated")
        ? children
        : <Navigate to="/home" />
}
