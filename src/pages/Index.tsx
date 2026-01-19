
import React from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Redirect index route to welcome page
const Index = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    navigate('/welcome', { replace: true });
  }, [navigate]);

  return null;
};

export default Index;
