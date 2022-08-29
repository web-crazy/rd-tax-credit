import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Box, Button, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

import EditProject from '../../components/EditProject';
import Loading from '../../components/Loading';
import { ProjectType } from '../../types/project';
import axios from '../../axios';
import { ExpenseType } from '../../types/expense';

const Project = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [list, setList] = useState<ProjectType[]>([]);
  const [selectedProject, setSelectedProject] = useState<ProjectType | null>();

  const loadProjectList = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/project');
      setList(response?.data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log('Error getting list of the project: ', err);
    }
  };

  useEffect(() => {
    loadProjectList();
  }, []);

  const handleUpdate = () => {
    setSelectedProject(null);
    loadProjectList();
  };

  const handleDeleteProject = async (id: string) => {
    try {
      await axios.delete(`/project/${id}`);
      loadProjectList();
    } catch (err) {
      console.log('Failed to Delete: ', err);
    }
  };

  const columns: GridColDef[] = [
    {
      field: 'name',
      headerName: 'Name',
      width: 200,
      renderCell: ({ row }) => (
        <Link to={`/project/${row.id}`}>
          <Box sx={{ textDecoration: 'underline', color: 'primary' }}>
            {row.name}
          </Box>
        </Link>
      ),
    },
    {
      field: 'expenses',
      headerName: 'Expenses',
      flex: 1,
      renderCell: ({ value = [] }) => (
        <Box>{value.map((ex: ExpenseType) => ex.name).join(',')}</Box>
      ),
    },
    { field: 'createdAt', headerName: 'Created Date', width: 150 },
    {
      field: 'actions',
      headerName: '',
      renderCell: ({ row }) => (
        <Box display="flex">
          <Button
            color="primary"
            sx={{ minWidth: 'auto', borderRadius: 5, p: 1 }}
            onClick={() => setSelectedProject(row)}
          >
            <EditIcon sx={{ fontSize: 20 }} />
          </Button>

          <Button
            color="error"
            sx={{ minWidth: 'auto', borderRadius: 5, p: 1 }}
            onClick={() => handleDeleteProject(row.id)}
          >
            <DeleteIcon sx={{ fontSize: 20 }} />
          </Button>
        </Box>
      ),
    },
  ];

  if (loading) {
    return (
      <Container
        sx={{
          py: 6,
          flex: 1,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Loading />
      </Container>
    );
  }

  return (
    <Container
      sx={{
        py: 4,
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
      }}
    >
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        mb={2}
      >
        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
          Project List
        </Typography>

        <Button
          sx={{ minWidth: 'auto', borderRadius: 24, p: 0.5 }}
          variant="contained"
          color="primary"
          onClick={() => setSelectedProject({})}
        >
          <AddIcon sx={{ fontSize: 40 }} />
        </Button>
      </Box>

      <DataGrid rows={list} columns={columns} />

      {!!selectedProject && (
        <EditProject
          onClose={() => setSelectedProject(null)}
          onUpdate={handleUpdate}
          project={selectedProject}
        />
      )}
    </Container>
  );
};

export default Project;
