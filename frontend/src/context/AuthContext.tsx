import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface IUser {
  username: string;
  email: string;
  avatar?: string;
}

interface AuthContextProps {
  user: IUser | null;
  login: (email: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  fetchUserProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      fetchUserProfile();
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/login`, { email, password });
      localStorage.setItem('token', response.data.token);
      setUser(response.data.user);
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };

  const register = async (username: string, email: string, password: string) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/register`, { username, email, password });
      localStorage.setItem('token', response.data.token);
      setUser(response.data.user);
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/login');
  };

  const fetchUserProfile = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/profile`);
      console.log(response.data);
      setUser(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, fetchUserProfile }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
