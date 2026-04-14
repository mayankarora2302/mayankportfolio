import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import * as mockData from '../data/mock';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const PortfolioContext = createContext(null);

export const usePortfolio = () => {
  const ctx = useContext(PortfolioContext);
  if (!ctx) throw new Error('usePortfolio must be used within PortfolioProvider');
  return ctx;
};

export const PortfolioProvider = ({ children }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const res = await axios.get(`${API}/portfolio`);
        setData(res.data);
      } catch (err) {
        console.warn('Backend unavailable, falling back to mock data:', err.message);
        setError(err.message);
        // Fallback to mock data
        setData({
          personalInfo: mockData.personalInfo,
          aboutContent: mockData.aboutContent,
          skillsData: mockData.skillsData,
          projectsData: mockData.projectsData,
          labsData: mockData.labsData,
          freelanceData: mockData.freelanceData,
          dsaData: mockData.dsaData,
          timelineData: mockData.timelineData,
          hobbiesData: mockData.hobbiesData,
          contactData: mockData.contactData,
          navLinks: mockData.navLinks,
        });
      } finally {
        setLoading(false);
      }
    };
    fetchPortfolio();
  }, []);

  const submitContact = async (formData) => {
    const res = await axios.post(`${API}/contact`, formData);
    return res.data;
  };

  return (
    <PortfolioContext.Provider value={{ data, loading, error, submitContact }}>
      {children}
    </PortfolioContext.Provider>
  );
};
