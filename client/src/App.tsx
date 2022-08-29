import { Box } from '@mui/material';
import Navbar from './components/Navbar';
import { Route, Routes } from 'react-router-dom';
import Project from './pages/project/List';
import ProjectDetail from './pages/project/Detail';
import Expense from './pages/expense/List';

import './App.styles.css';

const App = () => {
  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <Routes>
        <Route path="/" element={<Project />} />
        <Route path="/project/:id" element={<ProjectDetail />} />
        <Route path="/expense" element={<Expense />} />
      </Routes>
    </Box>
  );
};

export default App;
