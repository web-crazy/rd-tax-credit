import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Typography } from '@mui/material';
import { ProjectType } from '../../types/project';
import Loading from '../../components/Loading';
import axios from '../../axios';

const ProjectDetail = () => {
  const { id } = useParams();
  const [project, setProject] = useState<ProjectType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const loadProjectDetail = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`/project/${id}`);
      setProject(response?.data);
      setLoading(false);
    } catch (err) {
      console.log('Error loading project: ', err);
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProjectDetail();
  }, []);

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
      <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
        {project?.name}
      </Typography>
    </Container>
  );
};

export default ProjectDetail;
