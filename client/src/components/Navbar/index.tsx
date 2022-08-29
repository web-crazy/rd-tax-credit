import { Link } from 'react-router-dom';
import { AppBar, Box, Button, Container, Toolbar } from '@mui/material';

const Navbar = () => {
  return (
    <AppBar color="primary" position="relative" sx={{ py: 1 }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box display="flex" justifyContent="center" sx={{ width: '100%' }}>
            <Link to="/">
              <Button
                variant="text"
                sx={{ color: 'white', mx: 2, fontSize: 16 }}
              >
                Project
              </Button>
            </Link>

            <Link to="/expense">
              <Button
                variant="text"
                sx={{ color: 'white', mx: 2, fontSize: 16 }}
              >
                Expense
              </Button>
            </Link>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
