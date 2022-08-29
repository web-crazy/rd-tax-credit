import { Box, CircularProgress } from '@mui/material';

const Loading = () => {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      sx={{ width: '100%', height: '100%', flexGrow: 1 }}
    >
      <CircularProgress />
    </Box>
  );
};

export default Loading;
