import { useCallback, useEffect, useState } from 'react';
import {
  Box,
  Button,
  Dialog,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import * as Yup from 'yup';

import FormContainer from '../Inputs/FormContainer';
import TextField from '../Inputs/TextField';
import MultiSelect from '../Inputs/MultiSelect';
import { ProjectType } from '../../types/project';
import { ExpenseType } from '../../types/expense';
import axios from '../../axios';
import Loading from '../Loading';

type FormSubmitType = {
  name: string;
  expense: string;
};

type EditProjectType = {
  project: ProjectType;
  onClose: () => void;
  onUpdate: () => void;
};

const EditProject: React.FC<EditProjectType> = ({
  project,
  onClose,
  onUpdate,
}) => {
  const [expenses, setExpenses] = useState<ExpenseType[]>([]);
  const [loading, setLoading] = useState(true);
  const isEdit = !!project?.id;

  const validationSchema = Yup.object().shape({
    name: Yup.string().nullable().required('Name is required'),
    expenses: Yup.array().of(Yup.string()).min(1, 'Expense is required'),
  });

  const initialValues = {
    name: project?.name || '',
    expenses: project?.expenses?.map((ex: ExpenseType) => ex.id) || [],
  };

  const handleFormSubmit = useCallback(
    async (values: FormSubmitType) => {
      console.log('Form Values: ', values);
      try {
        if (isEdit) {
          await axios.put(`/project/${project.id}`, values);
        } else {
          await axios.post('/project', values);
        }
        onUpdate();
      } catch (err) {
        console.log('Create or Edit Failed: ', err);
      }
    },
    [isEdit],
  );

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

            <MultiSelect
              name="expenses"
              label="Expenses"
              options={expenses}
              valueKey="id"
              labelKey="name"
              // eslint-disable-next-line
              renderValue={(selected: any) => {
                // eslint-disable-next-line
                const data = expenses.filter((item: ExpenseType) => selected.includes(item.id || ''))
                  .map((item: ExpenseType) => item.name)
                  .join(', ');
                return data;
              }}
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
