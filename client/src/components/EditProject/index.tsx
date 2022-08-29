import { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Dialog,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import FormContainer from '../Inputs/FormContainer';
import TextField from '../Inputs/TextField';
import Select from '../Inputs/Select';
import { ProjectType } from '../../types/project';
import { ExpenseType } from '../../types/expense';
import axios from '../../axios';
import * as Yup from 'yup';
import Loading from '../Loading';

type FormSubmitType = {
  name: string;
  expense: string;
};

type EditProjectType = {
  project: ProjectType;
  onClose: () => void;
};

const EditProject: React.FC<EditProjectType> = ({ project, onClose }) => {
  const [expenses, setExpenses] = useState<ExpenseType[]>([]);
  const [loading, setLoading] = useState(true);

  const validationSchema = Yup.object().shape({
    name: Yup.string().nullable().required('Name is required'),
    expense: Yup.string().nullable().required('Expense is required'),
  });

  const initialValues = {
    name: project?.name || '',
    expense: project?.expenseId || '',
  };

  const handleFormSubmit = (values: FormSubmitType) => {
    console.log('Form Values: ', values);
  };

  const loadExpenseList = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/expense');
      setExpenses(response?.data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadExpenseList();
  }, []);

  const isEdit = !!project?.id;

  if (loading) {
    return (
      <Dialog open={true} maxWidth="sm" fullWidth onClose={onClose}>
        <Box
          sx={{
            width: '100%',
            minHeight: 200,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Loading />
        </Box>
      </Dialog>
    );
  }

  return (
    <Dialog open={true} maxWidth="sm" fullWidth onClose={onClose}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        px={4}
        py={2}
      >
        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
          {isEdit ? 'Edit Project' : 'Create Project'}
        </Typography>

        <IconButton color="primary" onClick={onClose}>
          <CloseIcon sx={{ fontSize: 24 }} />
        </IconButton>
      </Box>

      <Box p={4} pt={0}>
        <FormContainer
          validation={validationSchema}
          defaultValues={initialValues}
          onSuccess={handleFormSubmit}
        >
          <Stack spacing={2}>
            <TextField fullWidth name="name" variant="outlined" label="Name" />

            <Select
              fullWidth
              name="expense"
              label="Expense"
              options={expenses}
              valueKey="id"
              labelKey="name"
            />

            <Box display="flex" justifyContent="flex-end">
              <Button variant="outlined" color="primary" onClick={onClose}>
                Cancel
              </Button>

              <Button
                variant="contained"
                color="primary"
                type="submit"
                sx={{ ml: 2 }}
              >
                OK
              </Button>
            </Box>
          </Stack>
        </FormContainer>
      </Box>
    </Dialog>
  );
};

export default EditProject;
