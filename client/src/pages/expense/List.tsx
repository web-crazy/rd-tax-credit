import { useEffect, useState } from 'react';
import { Container, Box, Button, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

import EditExpense from '../../components/EditExpense';
import Loading from '../../components/Loading';
import { ExpenseType } from '../../types/expense';
import axios from '../../axios';

const Expense = () => {
  const [list, setList] = useState<ExpenseType[]>([]);
  const [expense, setExpense] = useState<ExpenseType | null>();
  const [loading, setLoading] = useState<boolean>(true);

  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Name', width: 200 },
    { field: 'amount', headerName: 'Amount', flex: 1 },
    {
      field: 'isQualified',
      headerName: 'Qualified',
      width: 150,
      renderCell: ({ value }) => (value ? 'Yes' : 'No'),
    },
    {
      field: 'actions',
      headerName: '',
      renderCell: ({ row }) => (
        <Box display="flex">
          <Button
            color="primary"
            sx={{ minWidth: 'auto', borderRadius: 5, p: 1 }}
            onClick={() => setExpense(row)}
          >
            <EditIcon sx={{ fontSize: 20 }} />
          </Button>

          <Button
            color="error"
            sx={{ minWidth: 'auto', borderRadius: 5, p: 1 }}
          >
            <DeleteIcon sx={{ fontSize: 20 }} />
          </Button>
        </Box>
      ),
    },
  ];

  const loadExpenseList = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/expense');
      setList(response?.data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadExpenseList();
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
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        mb={2}
      >
        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
          Expense List
        </Typography>

        <Button
          sx={{ minWidth: 'auto', borderRadius: 24, p: 0.5 }}
          variant="contained"
          color="primary"
          onClick={() => setExpense({})}
        >
          <AddIcon sx={{ fontSize: 40 }} />
        </Button>
      </Box>

      <DataGrid rows={list} columns={columns} />

      {!!expense && (
        <EditExpense expense={expense} onClose={() => setExpense(null)} />
      )}
    </Container>
  );
};

export default Expense;
